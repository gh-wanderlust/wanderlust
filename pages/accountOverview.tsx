import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import cookies from 'next-cookies';
import styled from 'styled-components';
import Navbar from '../components/userNavbar'

const AccountOverview = function(props: any) {
  const { user } = props;

  return (
    <div>
      {user ? (
        <div>
          <Navbar />
          <Wrapper>
            <UserImg src={user.imageUrl} />
            <InnerWrapper>
              <h1>{`${user.firstName} ${user.lastName}`}</h1>
              <h2>Upcoming Trips:</h2>
              <PhotoWrapper>
                {user.trips.map((trip: any) => {
                  if (trip.status === 'booked') {
                    const bookedListing = user.listings.filter(
                      (listing: any) => listing.id === trip.listingId
                    );
                    return (
                      <Link href={`/itinerary/${trip.id}`}>
                        <ListingImg src={bookedListing[0].ownerPhotos[0]} />
                      </Link>
                    );
                  }
                })}
              </PhotoWrapper>
              <h2>Interested In:</h2>
              <PhotoWrapper>
                {user.trips.map((trip: any) => {
                  if (trip.status === 'pending') {
                    const interestedListing = user.listings.filter(
                      (listing: any) => listing.id === trip.listingId
                    );
                    return (
                      <Link
                        key={interestedListing.id}
                        href={`/listings/${interestedListing[0].id}`}
                      >
                        <ListingImg src={interestedListing[0].ownerPhotos[0]} />
                      </Link>
                    );
                  }
                })}
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
justify-content: space-between
`

const UserImg = styled.img`
  object-fit: cover;
  border-radius: 50%;
  height: 20vw;
  width: 20vw;
  padding: 100px;
`;

const ListingImg = styled.img`
  object-fit: cover;
  height: 20vw;
  width: 20vw;
`;
