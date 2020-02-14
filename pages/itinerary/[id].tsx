import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import { User } from '../../server/db/models/interfaces';
import styled from 'styled-components';
import Navbar from '../../components/userNavbar';
import GoogleMapReact from 'google-map-react';
import zipcodes from 'zipcodes';
import * as dateFns from 'date-fns';
// import { format } from 'url';
// import uuid from 'uuid';

// const AnyReactComponent = ({ text }) => <Marker>{''}</Marker>;

const Itinerary = function(props: any) {
  const { trip } = props;
  const from = Date.parse(trip.dateFrom);
  const to = Date.parse(trip.dateTo);
  const tripLength = to - from;
  const tripLengthInDays = Math.floor(tripLength / (1000 * 60 * 60 * 24));

  const mapCoords = zipcodes.lookup(trip.listing.zipCode);

  const formattedDateFrom: Date = new Date(trip.dateFrom);
  const newDateFrom = dateFns.format(formattedDateFrom, 'MMMM dd, yyyy');
  const formattedDateTo: Date = new Date(trip.dateTo);
  const newDateTo = dateFns.format(formattedDateTo, 'MMMM dd, yyyy');

  return (
    <div>
      <Navbar />
      {trip.status === 'booked' ? (
        <Wrapper>
          <Details>
            <div>
              <h1>
                Your upcoming {tripLengthInDays} day trip to {trip.listing.city}
              </h1>
              <Dates>
                <IndividualDate>
                  <PlaneImg
                    src={
                      'https://cdn1.iconfinder.com/data/icons/transportation-28/100/26_Airplane_take_off-512.png'
                    }
                  />
                  <TravelDate>{newDateFrom}</TravelDate>
                </IndividualDate>
                <IndividualDate>
                  <PlaneImg
                    src={
                      'https://cdn1.iconfinder.com/data/icons/transportation-28/100/27_Airplane_landing-512.png'
                    }
                  />
                  <TravelDate>{newDateTo}</TravelDate>
                </IndividualDate>
              </Dates>
            </div>
            <Users>
              {trip.users.map((user: User) => {
                return (
                  <Individual key={user.id}>
                    <Link href={`/users/${user.id}`}>
                      <UserImage src={user.imageUrl} />
                    </Link>
                    <UserDetail>
                      <h3>{user.firstName}</h3>
                      <p>{user.email}</p>
                    </UserDetail>
                  </Individual>
                );
              })}
            </Users>
          </Details>
          <Accommodation>
            <h2>Accommodation Details: </h2>
            <h3>{trip.listing.name}</h3>
            <Address>{`${trip.listing.address}, ${trip.listing.city}, ${trip.listing.country}`}</Address>

            <ListingImg src={trip.listing.ownerPhotos[0]} />
            <div style={{ height: '200px', width: '80%' }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: 'AIzaSyBJKCWmM_cj5A-B0H-sZF51HoSF1QOwLPU',
                }}
                center={{
                  lat: 44.2641,
                  lng: -72.577,
                }}
                defaultZoom={13}
              >
                {/* <Marker
            lat=44.2641
            lng=-72.577
            text="test marker"
            key={uuid()}
          >

          </Marker> */}
              </GoogleMapReact>
            </div>
          </Accommodation>
        </Wrapper>
      ) : (
        <div>
          <Redirect>
            <h2>You currently do not have any booked trips!</h2>
            <h3>
              Continue to explore trips you're{' '}
              <Link href="/accountOverview">Interested In</Link> or{' '}
              <Link href="/listings">Find Your Next Adventure</Link>!
            </h3>
          </Redirect>
        </div>
      )}
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
  // width: 70%;
  // background: purple;
  // height: 100%;
  // align-content: space-between;
`;

const Accommodation = styled.div`
  display: column;
  width: 40%;
`;

const ListingImg = styled.img`
  width: 80%;
  height: 40%;
`;

const Users = styled.div`
  display: column;
  padding: 1em;
  flex-direction: row;
`;

const Individual = styled.div`
  display: flex;
  width: 80%;
  justify-content: flex-start;
`;

const UserImage = styled.img`
  object-fit: cover;
  border-radius: 50%;
  height: 10vw;
  width: 10vw;
  padding: 5px;
`;

const UserDetail = styled.div`
  display: column;
  padding: 1em;
  width: 50%;
  align-items: center;
`;

const IndividualDate = styled.div`
  display: flex;
  align-items: center;
`;

const PlaneImg = styled.img`
  object-fit: cover;
  padding: .5em;
  border-radius: 20%;
  height: 3vw;
  width: 3vw;
`;

const TravelDate = styled.div`
  font-size: 25px;
`;

const Dates = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Address = styled.p`
  display: flex;
`;

const Redirect = styled.div`
  padding: 3em;
  display: column;
  justify-content: space-between;
`;
