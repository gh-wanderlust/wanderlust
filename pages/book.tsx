import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as dateFns from 'date-fns';

import { User } from '../server/db/models/interfaces';
import { bookTrip } from '../store/store';
import Calendar from '../components/Calendar';

interface Tripmates {
  [key: number]: any;
}

const Book = (props: any) => {
  const { router, trip, users, bookTrip } = props;
  const { listing } = trip;

  const initTripmates: Tripmates = {};
  const formattedDateFrom: Date = new Date(trip.dateFrom);
  const formattedDateTo: Date = new Date(trip.dateTo);

  const [tripmates, setTripmates] = useState(initTripmates);
  const [dateFrom, setDateFrom] = useState(formattedDateFrom);
  const [dateTo, setDateTo] = useState(formattedDateTo);
  const [bookError, setBookError] = useState('');

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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (dateFrom && dateFrom) {
      const userIds: number[] = [];
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
      await axios.delete(`api/trips/${trip.id}`);
      router.push('/confirmation');
    } else {
      setBookError(
        "Please make sure you've properly selected a checkin and checkout date"
      );
    }
  };

  return (
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
        <ul>
          {users.map((user: any) => {
            const fullName = `${user.firstName} ${user.lastName}`;
            return (
              <div key={user.id} className="tripmate-option">
                <input
                  type="checkbox"
                  name={user.id}
                  onChange={(e) => handleSelect(e, user)}
                />
                <label htmlFor={user.id}>
                  <img src={user.imageUrl} alt={fullName} />
                  {fullName}
                </label>
              </div>
            );
          })}
        </ul>

        <h4>Confirm the dates</h4>
        <Calendar
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
        />
        <button type="submit">Confirm Booking</button>
      </form>
      <Link href="/listings">
        <button>Back to listings</button>
      </Link>
    </div>
  );
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
