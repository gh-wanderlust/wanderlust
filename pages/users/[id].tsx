import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styled from 'styled-components';
import Navbar from '../../components/userNavbar';

const UserProfile = function(props: any) {
  const { user } = props;

  return (
    <div>
      <Navbar />
      <Wrapper>
        <UserImg src={user.imageUrl} />
        <InnerWrapper>
          <h1>{`${user.firstName} ${user.lastName}`}</h1>
          <p>{user.email}</p>
          <h2>Interested Listings:</h2>
          <PhotoWrapper>
            {user.trips.map((trip: any) => {
              if (trip.status === 'pending') {
                const interestedListing = user.listings.filter(
                  (listing: any) => listing.id === trip.listingId
                );
                return (
                  <Link href={`/listings/${interestedListing[0].id}`}>
                    <ListingImg src={interestedListing[0].ownerPhotos[0]}/>
                  </Link>
                );
              }
            })}
          </PhotoWrapper>
        </InnerWrapper>
      </Wrapper>
    </div>
  );
};

UserProfile.getInitialProps = async (context: any) => {
  const id = context.query.id;
  const res = await axios.get(`http://localhost:3000/api/users/${id}`);
  return { user: res.data };
};

export default UserProfile;

const Wrapper = styled.div`
  display: flex;
  font-family: 'Lucida Console', sans-serif;
`;
const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PhotoWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

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
  padding: 5px;
`;
