import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Router from 'next/router';
import styled from 'styled-components';
import cookies from 'next-cookies';
import * as dateFns from 'date-fns';

import { User } from '../../server/db/models/interfaces';
import Review from '../../components/Review';
import Calendar from '../../components/Calendar';
import {
  loginUser,
  addInterestedUser,
  removeInterestedUser,
  getSingleListing,
  loadTrip,
} from '../../store/store';
import { apiUrl } from '../../util';

const SingleListing = (props: any) => {
  const {
    id,
    listing,
    loggedUser,
    users,
    getListing,
    addUser,
    removeUser,
    loadTrip,
  } = props;

  /** STATE **/
  const [userInterested, setInterested] = useState(false);
  const [dateFrom, setDateFrom] = useState(0);
  const [dateTo, setDateTo] = useState(0);
  const [bookError, setBookError] = useState('');
  const [isLoading, setLoading] = useState(true);
  const tripColors: any = {};
  if (!isLoading) {
    listing.trips.map((trip: any) => {
      if (trip.status === 'pending') {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        const hex = `#${randomColor}`;
        tripColors[trip.id] = hex;
      }
    });
  }

  const init = async () => {
    await getListing(id);
    setLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {});

  useEffect(() => {
    if (loggedUser) {
      users.find((user: User) => user.id === loggedUser.id)
        ? setInterested(true)
        : setInterested(false);
    }
  }, [users]);

  /** FORM HANDLING**/
  const handleInterest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userInterested) {
      await axios.delete(`/api/trips`, {
        data: { userId: loggedUser.id, listingId: listing.id },
      });
      removeUser(loggedUser.id);
    } else if (dateFrom !== 0 && dateTo !== 0) {
      await axios.post(`/api/trips`, {
        userIds: [loggedUser.id],
        trip: {
          dateFrom: dateFns.format(dateFrom, 'yyyy-MM-dd'),
          dateTo: dateFns.format(dateTo, 'yyyy-MM-dd'),
          status: 'pending',
          listingId: listing.id,
        },
      });
      addUser(loggedUser);
    } else {
      setBookError(
        "Please make sure you've properly selected a checkin and checkout date"
      );
    }
  };

  const handleBook = async (e: React.MouseEvent) => {
    const userId = loggedUser.id;
    const res = await axios.get(
      `/api/trips?userId=${userId}&listingId=${listing.id}`
    );
    const trip = res.data;

    await loadTrip(trip);

    Router.push('/book');
  };

  /** CONDITIONAL RENDERING **/
  const submitButtonText = userInterested
    ? "I'm no longer interested"
    : "I'm interested in these dates";

  const calendar = userInterested ? (
    ''
  ) : (
    <Calendar
      checkin={dateFrom}
      setCheckin={(v: any) => {
        setDateFrom(v);
        setBookError('');
      }}
      checkout={dateTo}
      setCheckout={(v: any) => {
        setDateTo(v);
        setBookError('');
      }}
      trips={listing.trips}
      tripColors={tripColors}
    />
  );

  const bookButton = userInterested ? (
    <Button onClick={handleBook}>Book now!</Button>
  ) : (
    ''
  );

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <Wrapper>
        <ImageGrid>
          {listing.ownerPhotos.map((imgUrl: string, idx: number) => {
            return <img key={idx} src={imgUrl} />;
          })}
        </ImageGrid>

        <Content>
          <Info>
            <Left>
              <SectionHeader className="title">{listing.name}</SectionHeader>
              <p>4.9 ★ (407)</p>
              <p>$200 a night</p>
              <p>4 beds</p>
              <p>2 baths</p>
            </Left>
            <Desc className="content">{listing.description}</Desc>
          </Info>

          <Booking>
            <Left>
              <SectionHeader className="title">Interested Users</SectionHeader>
            </Left>
            <div>
              <InterestedUsers>
                {users.length > 0 ? (
                  users.map((user: any) => {
                    return <UserThumb key={user.id} user={user} />;
                  })
                ) : (
                  <p>No one interested yet! Be the first!</p>
                )}
              </InterestedUsers>
              {loggedUser ? (
                <>
                  {calendar}
                  {bookError}
                  <form name="set-user-interest" onSubmit={handleInterest}>
                    <Button type="submit">{submitButtonText}</Button>
                  </form>
                  {bookButton}
                </>
              ) : (
                ''
              )}
            </div>
          </Booking>

          {/* <GuestPhotos>
          <Left>
            <SectionHeader>Guest Photos</SectionHeader>
          </Left>
          <GuestPhotoGrid>
            <img src="https://via.placeholder.com/150" alt="" />
            <img src="https://via.placeholder.com/150" alt="" />
            <img src="https://via.placeholder.com/150" alt="" />
            <img src="https://via.placeholder.com/150" alt="" />
            <img src="https://via.placeholder.com/150" alt="" />
            <img src="https://via.placeholder.com/150" alt="" />
          </GuestPhotoGrid>
        </GuestPhotos>

        <Reviews>
          <Left>
            <SectionHeader>Reviews</SectionHeader>
          </Left>
          <div>
            <Review />
          </div>
        </Reviews> */}
        </Content>
      </Wrapper>
    </div>
  );
};

SingleListing.getInitialProps = async function(context: any) {
  const { token } = cookies(context);
  let loggedUser = null;
  if (token) {
    const res = await axios.get(apiUrl(`/api/users/${token}`));
    loggedUser = res.data;
  }

  return {
    loggedUser,
    id: context.query.id,
  };
};

const mapState = (state: any) => {
  return {
    listing: state.listing,
    users: state.interestedUsers,
    tripToBook: state.tripToBook,
  };
};

const mapDispatch = (dispatch: Dispatch) => {
  return {
    getListing: bindActionCreators(getSingleListing, dispatch),
    addUser: bindActionCreators(addInterestedUser, dispatch),
    removeUser: bindActionCreators(removeInterestedUser, dispatch),
    loadTrip: bindActionCreators(loadTrip, dispatch),
  };
};

export default connect(mapState, mapDispatch)(SingleListing);

/** HELPERS **/

const UserThumb = (props: any) => {
  const { user } = props;
  const fullName = `${user.firstName} ${user.lastName}`;
  return (
    <UserThumbnail key={user.id}>
      <img src={user.imageUrl} alt={fullName} />
      {fullName}
    </UserThumbnail>
  );
};

const Wrapper = styled.div`
  margin: 0 1vw;
  padding-bottom: 15vh;
`;

const ImageGrid = styled.div`
  display: grid;
  height: 50vh;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 8px;
  grid-template-areas:
    'a b d'
    'a c d';
  margin: 2vh 0;

  img {
    width: 100%;
    object-fit: cover;
    height: 100%;

    :first-child {
      grid-area: a;
    }

    :nth-child(2) {
      grid-area: d;
    }

    :nth-child(3) {
      grid-area: c;
    }

    :nth-child(4) {
      grid-area: b;
    }
  }
`;

const Content = styled.div`
  margin-top: 6vh;
  display: grid;
  grid-gap: 8vh;
`;

const SectionHeader = styled.h2`
  max-width: 15ch;
  text-align: right;
  margin: 0;
`;

const Section = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;

  p {
    margin: 0;
  }
`;

const Info = styled(Section)``;

const Desc = styled.p`
  width: 85%;
`;

const Booking = styled(Section)``;
const GuestPhotos = styled(Section)``;
const Reviews = styled(Section)``;

const GuestPhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-template-rows: 1fr 1fr;
  grid-gap: 8px;
  width: 85%;

  img {
    width: 100%;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 5vw;

  p {
    padding: 0;
    margin: 0;
  }
`;

const InterestedUsers = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;
const UserThumbnail = styled.li`
  display: flex;
  align-items: center;
  margin: 1em;

  img {
    width: 3em;
    height: 3em;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 1em;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  padding: 1em;
  margin: 0.5em 0 0 0.5em;
  border-radius: 2px;
  background-color: var(--accent-dark);
  color: white;
  transition: all 0.2s ease;

  :hover {
    background-color: var(--accent-light);
  }
`;
