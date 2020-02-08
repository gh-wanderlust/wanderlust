import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Link from 'next/link';
import { loginUser, addTripUser, removeTripUser } from '../../store/store';
import { bindActionCreators } from 'redux';
import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';

// import { useRouter } from 'next/router';
// import { withRouter } from "next/router"

// interface ListingData {
//   name: string;
//   description: string;
//   address: string;
//   city: string;
//   country: string;
// }

// interface ListingProps {
//   name: string;
//   description: string;
//   address: string;
//   city: string;
//   country: string;
//   ownerPhotos
// }

const SingleListing = (props: any) => {
  const { listing, dummyUser, interestedUsers, addUser, removeUser } = props;

  const [userInterested, setInterested] = useState(false);

  const setInterest = (e: React.FormEvent<HTMLFormElement>) => {
    if (userInterested) {
      removeUser(dummyUser);
      setInterested(false);
    } else {
      addUser(dummyUser);
      setInterested(true);
    }
  };

  return (
    <div>
      <div>
        {listing.ownerPhotos.map((imgUrl: string) => {
          return <img src={imgUrl} />;
        })}
      </div>
      <div>
        <h2>{listing.name}</h2>
        <p>{listing.description}</p>
      </div>
      <div>
        <h2>Interested Users</h2>
        <ul>
          {interestedUsers.map((user: any) => {
            return <li>{`${user.firstName} ${user.lastName}`}</li>;
          })}
          {userInterested ? (
            <li>{`${dummyUser.firstName} ${dummyUser.lastName}`}</li>
          ) : (
            ''
          )}
        </ul>
        <form name='set-user-interest' onSubmit={setInterest}>
          <label htmlFor='date-from'>Checkin: </label>
          <input name='date-from' type='date'></input>
          <label htmlFor='date-to'>Checkout: </label>
          <input name='date-to' type='date'></input>

          <button type='submit'>
            {userInterested ? ':/ No longer interested' : "I'm interested!"}
          </button>
        </form>
        <Link href='/book'>
          <button>Book now!</button>
        </Link>
      </div>
    </div>
  );
};

SingleListing.getInitialProps = async function(context: any) {
  const user = {
    id: 10,
    firstName: 'Grace',
    lastName: 'Hopper',
    email: 'alwaysbe@coding.com',
    password: 'coding',
  };
  context.store.dispatch(loginUser(user as any));
  const dummyUser = context.store.getState().user;
  const listingId = context.query.id;
  const res = await axios.get(
    `https://wanderlust-rwnchen.gh-wanderlust.now.sh/api/listings/${listingId}?include=users`
  );
  const listing = res.data;

  listing.trips.map((trip: any) => {
    if (trip.status === 'pending') {
      return trip.users.map((user: any) => {
        context.store.dispatch(addTripUser(user));

        return <li key={user.id}>{`${user.firstName} ${user.lastName}`}</li>;
      });
    }
  });

  return {
    listing,
    dummyUser,
    interestedUsers: context.store.getState().users,
  };
};

const mapDispatchtoProps = (dispatch: any) => {
  return {
    addUser: bindActionCreators(addTripUser, dispatch),
    removeUser: bindActionCreators(removeTripUser, dispatch),
  };
};

export default connect(null, mapDispatchtoProps)(SingleListing);
