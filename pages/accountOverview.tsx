import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import cookies from 'next-cookies';

const AccountOverview = function(props: any) {
  const { user } = props;

  return (
    <div>
      {user ? (
        <div>
          <h1>{`${user.firstName} ${user.lastName}`}</h1>
          <img src={user.imageUrl} />
          <p>{user.email}</p>
          <h2>Upcoming Trips:</h2>
          {user.trips.map((trip: any) => {
            if (trip.status === 'booked') {
              console.log('TRIP: ', trip);
              const bookedListing = user.listings.filter(
                (listing: any) => listing.id === trip.listingId
              );
              return (
                <Link href={`/itinerary/${trip.id}`}>
                  <div>{bookedListing[0].name}</div>
                </Link>
              );
            }
          })}
          <h2>Interested Listings:</h2>
          {user.trips.map((trip: any) => {
            if (trip.status === 'pending') {
              const interestedListing = user.listings.filter(
                (listing: any) => listing.id === trip.listingId
              );
              return (
                <Link href={`/listings/${interestedListing[0].id}`}>
                  <div>{interestedListing[0].name}</div>
                </Link>
              );
            }
          })}
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
