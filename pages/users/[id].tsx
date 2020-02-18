import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styled from 'styled-components';

const UserProfile = function(props: any) {
  const { user } = props;

  return (
    <div>
      <Wrapper>
        <UserImg src={user.imageUrl} />
        <InnerWrapper>
          <h1>{`${user.firstName} ${user.lastName}`}</h1>
          <p>{user.email}</p>
          <h2>Interested Listings:</h2>
          <PhotoWrapper>
            {user.trips.length ? (
              user.trips.map((trip: any) => {
                if (trip.status === 'pending') {
                  return (
                    <Link key={trip.id} href={`/listings/${trip.listing.id}`}>
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
`;
const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PhotoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

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
