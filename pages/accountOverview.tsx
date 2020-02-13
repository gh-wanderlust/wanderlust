import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import cookies from 'next-cookies';
import styled from 'styled-components';

const AccountOverview = function(props: any) {
  const { user } = props;

  return (
    <div>
      {user ? (
        <div>
          <Wrapper>
            <UserImg src={user.imageUrl} />
            <InnerWrapper>
              <h1>{`${user.firstName} ${user.lastName}`}</h1>
              <h2>Upcoming Trips:</h2>
              <PhotoWrapper>
                {user.trips.length > 0 ? (
                  user.trips.map((trip: any) => {
                    if (trip.status === 'booked') {
                      return (
                        <Link key={trip.id} href={`/itinerary/${trip.id}`}>
                          <ListingImg src={trip.listing.ownerPhotos[0]} />
                        </Link>
                      );
                    }
                  })
                ) : (<div></div>)}
              </PhotoWrapper>
              <h2>Interested In:</h2>
              <PhotoWrapper>
                {user.trips.length ? (
                  user.trips.map((trip: any) => {
                    if (trip.status === 'pending') {
                      return (
                        <Link
                          key={trip.id}
                          href={`/listings/${trip.listing.id}`}
                        >
                          <ListingImg src={trip.listing.ownerPhotos[0]} />
                        </Link>
                      );
                    }
                  })
                ) : (
                  <div></div>
                )}
              </PhotoWrapper>
            </InnerWrapper>
          </Wrapper>
        </div>
      ) : (
        <div>
          <Link href={'/login'}>Go to Login</Link>
          <Link href={'/signup'}>Sign Up</Link>
        </div>
      )}
    </div>
  );
};

AccountOverview.getInitialProps = async (context: any) => {
  let { token } = cookies(context);
  const id = token;

  if (id) {
    const res = await axios.get(`http://localhost:3000/api/users/${id}`);
    return { user: res.data };
  }
};

export default AccountOverview;

const Wrapper = styled.div`
  display: flex;
`;

const InnerWrapper = styled.div`
display: flex;
flex-direction: column;
`

const PhotoWrapper = styled.div`
display: flex; 
flex-direction: row;
`

const UserImg = styled.img`
  object-fit: cover;
  border-radius: 50%;
  height: 12vw;
  width: 12vw;
  padding: 100px;
`;

const ListingImg = styled.img`
  object-fit: cover;
  height: 15vw;
  width: 15vw;
  padding-right: 10px;
`;
