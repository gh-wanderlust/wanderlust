import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as dateFns from 'date-fns';
import styled from 'styled-components';

import { User } from '../server/db/models/interfaces';
import { bookTrip } from '../store/store';
import Calendar from '../components/Calendar';
import Navbar from '../components/Navbar'

interface Tripmates {
  [key: number]: any;
}

const dummyTrip = {
  "id": 8,
  "dateFrom": "2020-02-18",
  "dateTo": "2020-02-22",
  "status": "pending",
  "createdAt": "2020-02-13T20:58:53.086Z",
  "updatedAt": "2020-02-13T20:58:53.086Z",
  "listingId": 8,
  "users": [
    {
      "id": 8,
      "firstName": "Mika",
      "lastName": "B",
      "username": "mika@dev.com",
      "email": "mika@dev.com",
      "imageUrl": "https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      "createdAt": "2020-02-13T20:58:11.986Z",
      "updatedAt": "2020-02-13T20:58:11.986Z",
      "UserTrip": {
        "createdAt": "2020-02-13T20:58:53.198Z",
        "updatedAt": "2020-02-13T20:58:53.198Z",
        "userId": 8,
        "tripId": 8
      }
    },
    {
      "id": 9,
      "firstName": "Joanna",
      "lastName": "H",
      "username": "joanna@dev.com",
      "email": "joanna@dev.com",
      "imageUrl": "http://placekitten.com/600/400",
      "createdAt": "2020-02-13T20:58:11.986Z",
      "updatedAt": "2020-02-13T20:58:11.986Z",
      "UserTrip": {
        "createdAt": "2020-02-13T20:58:53.198Z",
        "updatedAt": "2020-02-13T20:58:53.198Z",
        "userId": 8,
        "tripId": 8
      }
    }
  ],
  "listing": {
    "id": 8,
    "name": "Cozy Lakeview Loft",
    "description": "The Lakeview Loft is a freshly remodeled loft space with a vintage Chicago theme and modern amenities. ",
    "address": "1632 W Wrightwood Ave",
    "city": "Chicago",
    "country": "United States of America",
    "zipCode": "60618",
    "minOccupants": 3,
    "maxOccupants": 6,
    "ownerPhotos": [
      "https://a0.muscache.com/im/pictures/63ac9caa-c2ba-47ba-9b2e-ac14ad409697.jpg?aki_policy=large",
      "https://a0.muscache.com/im/pictures/1f88d847-9109-44a7-b7d1-6bb46364ff98.jpg?aki_policy=large",
      "https://a0.muscache.com/im/pictures/b80546b5-5e79-4e98-b207-0029c38cfc19.jpg?aki_policy=xx_large",
      "https://a0.muscache.com/im/pictures/be5bd8d0-b801-45ca-99f1-d54567806d21.jpg?aki_policy=poster"
    ],
    "price": 5900,
    "createdAt": "2020-02-13T20:49:02.994Z",
    "updatedAt": "2020-02-13T20:49:02.994Z"
  }
}

const Book = (props: any) => {
  const { router, trip, users, bookTrip } = props; 
  // const { router, users, bookTrip } = props;
  const { listing } = trip;

  console.log(trip)

  // let trip = dummyTrip
  // let {listing} = trip
  

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
    <>
      <Navbar/>
    <Wrapper>
      <Content>
        <div>
        <Header>Booking information</Header>

        {/* <div>
          <h4>Listing</h4>
          <p>{listing.name}</p>
          <p>{listing.address}</p>
          <p>{listing.description}</p>
        </div> */}

        <div>
          <Subheader>Who's coming?</Subheader>
          <UserList>
          {trip.users.map((user: any) => {
            return (
            <UserWrapper key={user.id}>
              <ProfilePic src={user.imageUrl} alt={`${user.firstName} ${user.lastName}profile image`}/>
              <Name>{user.firstName}</Name>
            </UserWrapper>
            )
          })}
          </UserList>
        </div>

        <div>
          <Subheader>{dateFns.differenceInDays(formattedDateTo, formattedDateFrom)} nights in {listing.city}</Subheader>
          <DateLine>
            <MiniCal>
              <MiniMonth>{dateFns.format(formattedDateFrom, 'LLL')}</MiniMonth>
              <span>{Number(dateFns.format(formattedDateFrom, 'd')) + 1}</span>
            </MiniCal>

            <div>
              <p>{(dateFns.format(formattedDateFrom, 'EEEE'))} check in</p>
              <p>2:00 PM</p>
            </div>
          </DateLine>
          
          <DateLine>
            <MiniCal>
              <MiniMonth>{dateFns.format(formattedDateTo, 'LLL')}</MiniMonth>
              <span>{Number(dateFns.format(formattedDateTo, 'd'))}</span>
            </MiniCal>

            <div>
              <p>{dateFns.format(formattedDateTo, 'EEEE')} check out</p>
              <p>11:00 AM</p>
            </div>
          </DateLine>
        </div>
      </div>

      <Summary>
        <MainInfo>
          <div>
            <ListingName>{listing.name}</ListingName>
            <p>Rental in {listing.city}</p>
          </div>
          <ListingImage src={trip.listing.ownerPhotos[0]} alt={`${listing.name} photo`}/>
        </MainInfo>

        
        <Details>
          <p>{trip.users.length} guests</p>
          <p>{dateFns.format(formattedDateFrom, 'MMMM dd, yyyy')} -> {dateFns.format(formattedDateTo, 'MMMM dd, yyyy')}</p>
        </Details>

        <Breakdown>
          <Line>
            <span>${(listing.price / 100)} x {dateFns.differenceInDays(formattedDateTo, formattedDateFrom)} nights</span>
            <span>${(listing.price / 100) * dateFns.differenceInDays(formattedDateTo, formattedDateFrom)}</span>
          </Line>


          <Line>
            <p>Service Fee</p>
            <p>$25</p>
          </Line>

          <Line>
            <p>Total(USD)</p>
            <p>${(((listing.price) * dateFns.differenceInDays(formattedDateTo, formattedDateFrom)) + 2500) /100}</p>
         </Line>
        </Breakdown>
        <StyledButton onClick={() => console.log('submitted, will add later -- mika')} >Confirm</StyledButton>
      </Summary>

      {/* <form name="tripmate-selection" onSubmit={handleSubmit}>
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
          trips={[]}
          tripColors={{}}
        />
        <button type="submit">Confirm Booking</button>
      </form>
      <Link href="/listings">
        <button>Back to listings</button>
      </Link> */}
        </Content>
      </Wrapper>
    </>
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
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

const Content = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  padding: 4vh 3vw;

  * {
    margin: 0;
  }
`

const Header = styled.h2`
  font-size: 32px;
  font-weight: 500;
`

const Subheader = styled.h3`
  font-size: 28px;
  font-weight: 500;
  margin: 3vh 0 10px 0;
`

const UserList = styled.ul`
  padding: 0;
  display: flex;
`

const UserWrapper = styled.li`
  list-style: none;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ProfilePic = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`

const Name = styled.p`
  margin: 0;
  margin-top: 5px;
`

const DateLine = styled.div`
  display: flex; 
  align-items: center;
  margin-bottom: 3vh;

  p {
    font-size: 24px;
  }
`

const MiniCal = styled.div`
  min-width: max-content;
  min-height: max-content;
  width: 90px;
  height: 90px;
  /* background-color: var(--accent-dark); */
  border: 1px solid var(--accent-dark);
  border-radius: 1px;
  color: var(--accent-dark);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-weight: 300;
  margin-right: 2vw;
`

const MiniMonth = styled.span`
  font-size: 20px;
`

const Summary = styled.div`
  border: 1px solid rgb(228, 228, 228) ;
  width: max-content;
  padding: 3vh 3vw;
  display: grid;
`
const MainInfo = styled.div`
  display:flex;
  align-items:center;
  border-bottom: 1px solid black;
  padding-bottom: 3vh;

  div {
    margin-right: 4vw;
  }
`

const ListingName = styled.p`
  font-weight: 600;
`

const ListingImage = styled.img`
  width: 7vw;
  object-fit: cover;
`

const Details = styled.div`
  border-bottom: 1px solid black;
  padding: 3vh 0;
`

const Breakdown = styled.div`
border-bottom: 1px solid black;
  padding: 3vh 0;
`
const Line = styled.div`
  display: flex;
  justify-content: space-between
`
const StyledButton = styled.button`
 border-radius: initial;
 background: var(--accent-dark);
 box-shadow: none;
 color: white;
 border:0;
 font-family: inherit;
 font-size: 18px;
 padding: 18px 0;
 border-radius: 2px;
 margin-top: 2vh;
 cursor: pointer;

 :hover {
  background: var(--accent-light);
 }
`