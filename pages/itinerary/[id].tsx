import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import { User } from '../../server/db/models/interfaces';
import styled from 'styled-components';
import Navbar from '../../components/userNavbar';
import GoogleMapReact from 'google-map-react';
import zipcodes from 'zipcodes';
// import { dateFns } from 'date-fns'
import { format } from 'url';
// import uuid from 'uuid';

// const AnyReactComponent = ({ text }) => <Marker>{''}</Marker>;

const Itinerary = function(props: any) {
  const { trip } = props;
  const from = Date.parse(trip.dateFrom);
  const to = Date.parse(trip.dateTo);
  const tripLength = to - from;
  const tripLengthInDays = Math.floor(tripLength / (1000 * 60 * 60 * 24));

  const mapCoords = zipcodes.lookup(trip.listing.zipCode);

  // const formattedDateFrom: Date = new Date(trip.dateFrom)

  // dateFns.format(formattedDateFrom, 'MMMM dd, yyyy')

  return (
    <div>
      <Navbar />
      <Wrapper>
        <Details>
          {console.log(trip)}
          <h1>
            Your upcoming {tripLengthInDays} day trip to {trip.listing.city}
          </h1>

          <Schedule>
            <Timeline>
              <TravelImg
                src={
                  'https://cdn1.iconfinder.com/data/icons/transportation-28/100/26_Airplane_take_off-512.png'
                }
              />
              <TravelDate>{trip.dateFrom}</TravelDate>
            </Timeline>
            <Timeline>
              <TravelImg
                src={
                  'https://cdn1.iconfinder.com/data/icons/transportation-28/100/27_Airplane_landing-512.png'
                }
              />
              <TravelDate>{trip.dateTo}</TravelDate>
            </Timeline>
          </Schedule>
          <Users>
            {trip.users.map((user: User) => {
              return (
                <div>
                  <Link key={user.id} href={`/users/${user.id}`}>
                    <UserImage src={user.imageUrl} />
                  </Link>
                  <UserName>{user.firstName}</UserName>
                </div>
              );
            })}
          </Users>
          
          
        </Details>
        <div>
          <h2>Accommodation Details: </h2>
          <h3>{trip.listing.name}</h3>
          <p>{`${trip.listing.address}, ${trip.listing.city}`}</p>
          <p>{trip.listing.country}</p>
          <ListingImg src={trip.listing.ownerPhotos[0]} />
          <div style={{ height: '200px', width: '200px' }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: GOOGLE_MAPS_API_KEY
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
  width: 55%;
  // background: purple;
  align-content: space-between;
`;

const ListingImg = styled.img`
  width: 40%;
  height: 30%;
`;

const Users = styled.div`
  display: flex;
  flex-direction: row;
`;

const UserImage = styled.img`
  object-fit: cover;
  border-radius: 50%;
  height: 10vw;
  width: 10vw;
  padding: 5px;
`;

const UserName = styled.p``;

const Timeline = styled.div`
  display: flex;
  align-items: center;
`;

const TravelImg = styled.img`
  object-fit: cover;
  border-radius: 10%;
  height: 5vw;
  width: 5vw;
`;

const TravelDate = styled.div`
  font-size: 25px;
`;

const Schedule = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
