import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from 'next/link';
import { User } from '../../server/db/models/interfaces';
import {
  loginUser,
  addInterestedUser,
  removeInterestedUser,
  getSingleListing,
} from '../../store/store';

const SingleListing = (props: any) => {
  const {
    id,
    listing,
    dummyUser,
    users,
    getListing,
    addUser,
    removeUser,
  } = props;

  /** STATE **/
  const [userInterested, setInterested] = useState(false);
  const [dateFrom, setDateFrom] = useState(todayString());
  const [dateTo, setDateTo] = useState(todayString());

  useEffect(() => {
    getListing(id);
  }, []);

  useEffect(() => {
    users.find((user: User) => user.id === dummyUser.id)
      ? setInterested(true)
      : setInterested(false);
  }, [users]);

  /** FORM HANDLING**/
  const handleInterest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userId = dummyUser.id;

    if (userInterested) {
      await axios.delete(`/api/trips?userId=${userId}&listingId=${listing.id}`);
      removeUser(dummyUser.id);
    } else {
      await axios.post(`/api/trips?userId=${userId}`, {
        dateFrom,
        dateTo,
        status: 'pending',
        listingId: listing.id,
      });
      addUser(dummyUser);
    }
  };

  return (
    <div>
      <div>
        {listing.ownerPhotos.map((imgUrl: string, idx: number) => {
          return <img key={idx} src={imgUrl} />;
        })}
      </div>
      <div>
        <h2>{listing.name}</h2>
        <p>{listing.description}</p>
      </div>
      <div>
        <h2>Interested Users</h2>
        <ul>
          {users.map((user: any) => {
            return <li>{`${user.firstName} ${user.lastName}`}</li>;
          })}
        </ul>
        <form name='set-user-interest' onSubmit={handleInterest}>
          <label htmlFor='date-from'>Checkin: </label>
          <input
            name='date-from'
            type='date'
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            required
          ></input>
          <label htmlFor='date-to'>Checkout: </label>
          <input
            name='date-to'
            type='date'
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            required
          ></input>

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
  const users = await axios.get('http://localhost:3000/api/users');
  const user = users.data.find((u: any) => u.firstName === 'Grace');
  context.store.dispatch(loginUser(user));
  const dummyUser = context.store.getState().user;

  return {
    dummyUser,
    id: context.query.id,
  };
};

const mapState = (state: any) => {
  return {
    listing: state.listing,
    user: state.user,
    users: state.interestedUsers,
  };
};

const mapDispatch = (dispatch: any) => {
  return {
    getListing: bindActionCreators(getSingleListing, dispatch),
    addUser: bindActionCreators(addInterestedUser, dispatch),
    removeUser: bindActionCreators(removeInterestedUser, dispatch),
  };
};

export default connect(mapState, mapDispatch)(SingleListing);

/** HELPERS **/

const todayString = () => {
  const today = new Date(Date.now());
  const yyyy = today.getFullYear();
  let mm: string | number = today.getMonth() + 1;
  let dd: string | number = today.getDate();

  if (mm < 10) mm = '0' + mm;
  if (dd < 10) dd = '0' + dd;

  return `${yyyy}-${mm}-${dd}`;
};
