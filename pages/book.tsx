import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as dateFns from 'date-fns';
import styled from 'styled-components';
import cookies from 'next-cookies';

import { User } from '../server/db/models/interfaces';
import { bookTrip } from '../store/store';
import Calendar from '../components/Calendar';
import { apiUrl } from '../util';

interface Tripmates {
  [key: number]: any;
}

const Book = (props: any) => {
  const { router, trip, users, bookTrip, token } = props;
  const { listing } = trip;
  const loggedId = parseInt(token);

  const initTripmates: Tripmates = {};
  const formattedDateFrom: Date = new Date(trip.dateFrom);
  const formattedDateTo: Date = new Date(trip.dateTo);

  const [tripmates, setTripmates] = useState(initTripmates);
  const [dateFrom, setDateFrom] = useState(formattedDateFrom);
  const [dateTo, setDateTo] = useState(formattedDateTo);
  const [bookError, setBookError] = useState('');
  const [calendarDisabled, setCalendarDisabled] = useState(true);

  useEffect(() => {
    if (!listing) router.replace('/listings');
  }, []);

  const handleSelect = (e: React.FormEvent, user: User) => {
    const newTripmates = { ...tripmates };
    if (!tripmates[user.id]) {
      newTripmates[user.id] = true;
    } else {
      newTripmates[user.id] = false;
    }
    setTripmates(newTripmates);

    const userIds = [loggedId];

    Object.keys(tripmates).forEach((idStr: string) => {
      const id = parseInt(idStr);
      if (tripmates[id]) userIds.push(id);
    });

    console.log(tripmates, userIds);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (dateFrom && dateFrom) {
      const userIds = [loggedId];
      const newTrip = {
        dateFrom: dateFns.format(dateFrom, 'yyyy-MM-dd'),
        dateTo: dateFns.format(dateTo, 'yyyy-MM-dd'),
        status: 'booked',
        listingId: listing.id,
      };

      Object.keys(tripmates).forEach((idStr: string) => {
        const id = parseInt(idStr);
        if (tripmates[id]) userIds.push(id);
      });

      const res = await axios.post(`/api/trips`, { userIds, trip: newTrip });
      const resTrip = res.data;
      bookTrip(resTrip);

      // const deleteUserTrip = axios.delete(`/api/trips/${trip.id}`);

      await Promise.all(
        userIds.map((id: number) => {
          return axios.delete(`/api/trips`, {
            data: { userId: id, listingId: listing.id },
          });
        })
      );

      router.push('/confirmation');
    } else {
      setBookError(
        "Please make sure you've properly selected a checkin and checkout date"
      );
    }
  };

  const usersList = users.map((user: any) => {
    const fullName = `${user.firstName} ${user.lastName}`;
    const input =
      user.id === loggedId ? (
        <input type="checkbox" name={user.id} checked disabled />
      ) : (
        <input
          type="checkbox"
          name={user.id}
          onChange={(e) => handleSelect(e, user)}
        />
      );

    return (
      <div key={user.id} className="tripmate-option">
        {input}
        <label htmlFor={user.id}>
          <img src={user.imageUrl} alt={fullName} />
          {fullName}
        </label>
      </div>
    );
  });

  const DateButton = (props: any) => {
    const { date } = props;
    return (
      <StyledDate onClick={() => setCalendarDisabled(false)}>
        {dateFns.format(date, 'MMMM do, yyyy')}
      </StyledDate>
    );
  };

  const calendar = calendarDisabled ? (
    <div>
      <h4>From: </h4>
      <DateButton date={dateFrom} />
      <h4>To: </h4>
      <DateButton date={dateTo} />
    </div>
  ) : (
    <>
      {bookError}
      <Calendar
        book
        checkin={dateFrom}
        setCheckin={(v: any) => {
          setDateFrom(v);
          setBookError('');
        }}
        checkout={dateTo}
        setCheckout={(v: any) => {
          setDateTo(v);
          setBookError('');
        }}
        trips={[trip]}
        tripColors={{ [trip.id]: '3E8A92' }}
      />
      <button onClick={() => setCalendarDisabled(true)}>
        Select these dates
      </button>
    </>
  );

  return !listing ? (
    <Redirect>No trip to book. Redirecting to listings page...</Redirect>
  ) : (
    <div>
      <h2>Booking Confirmation</h2>

      <div>
        <h4>Listing</h4>
        <p>{listing.name}</p>
        <p>{listing.address}</p>
        <p>{listing.description}</p>
      </div>

      <form name="tripmate-selection" onSubmit={handleSubmit}>
        <h4>Choose your tripmates!</h4>
        <ul>{usersList}</ul>

        <h4>Confirm the dates</h4>
        {calendar}
        <button type="submit">Confirm Booking</button>
      </form>
      <Link href="/listings">
        <button>Back to listings</button>
      </Link>
    </div>
  );
};

Book.getInitialProps = async function(context: any) {
  const { token } = cookies(context);

  return { token };
};

const mapState = (state: any) => {
  return {
    users: state.interestedUsers,
    trip: state.tripToBook,
  };
};

const mapDispatch = (dispatch: Dispatch) => {
  return {
    bookTrip: bindActionCreators(bookTrip, dispatch),
  };
};

export default connect(mapState, mapDispatch)(withRouter(Book));

const Redirect = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const StyledDate = styled.button``;
