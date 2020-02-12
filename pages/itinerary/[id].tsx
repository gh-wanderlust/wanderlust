import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import { User } from '../../server/db/models/interfaces';
import styled from 'styled-components';
import Navbar from '../../components/userNavbar'

const Itinerary = function(props: any) {
  const { trip } = props;

  return (
    <div>
    <Navbar />
    <Wrapper>
      <Details>
        <h1>Trip to {trip.listing.city}</h1>
        <h2>Staying at {trip.listing.name}</h2>
        <ListingImg src={trip.listing.ownerPhotos[0]} />
        <ListingDescription>{trip.listing.description}</ListingDescription>
        {trip.users.map((user: User) => {
          return (
            <Link key={user.id} href={`/users/${user.id}`}>
              <UserImage src={user.imageUrl} />
            </Link>
          );
        })}
      </Details>
      <div>
        <Timeline>
          <TravelImg
            src={
              'https://cdn1.iconfinder.com/data/icons/transportation-28/100/26_Airplane_take_off-512.png'
            }
          />
          <TravelDate>{trip.dateFrom}</TravelDate>
        </Timeline>
        <svg height="500" width="500">
            <line x1="30" y1="10" x2="30" y2="800" stroke="#23565C" strokeWidth={5}/>
        </svg>
        <Timeline>
          <TravelImg
            src={
              'https://cdn1.iconfinder.com/data/icons/transportation-28/100/27_Airplane_landing-512.png'
            }
          />
          <TravelDate>{trip.dateTo}</TravelDate>
        </Timeline>
      </div>
    </Wrapper>
    </div>
  );
};

Itinerary.getInitialProps = async (context: any) => {
  let tripId = context.query.id;

  if (tripId) {
    const res = await axios.get(
      `http://localhost:3000/api/trips/${tripId}?users=true&listings=true`
    );
    return { trip: res.data };
  }
};

export default Itinerary;

const Wrapper = styled.div`
  padding: 3em;
  display: flex;
  justify-content: space-between;
`;

const Details = styled.div`
  width: 50%;
`;

const ListingImg = styled.img`
  width: 60%;
`;

const ListingDescription = styled.p`
  width: 100%;
`;

const UserImage = styled.img`
  object-fit: cover;
  border-radius: 50%;
  height: 10vw;
  width: 10vw;
  padding: 5px;
`;

const Timeline = styled.div`
  display: flex;
  align-items: center;
`

const TravelImg = styled.img`
  object-fit: cover;
  border-radius: 10%;
  height: 5vw;
  width: 5vw;
`;

const TravelDate = styled.div`
  font-size: 35px;
`