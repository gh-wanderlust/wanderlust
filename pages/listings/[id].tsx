import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useRouter } from 'next/router';
import styled from 'styled-components';
// import Link from 'next/link';
import { User } from '../../server/db/models/interfaces';
import Review from '../../components/Review';
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
    dummyUser,
    users,
    getListing,
    addUser,
    removeUser,
    loadTrip,
  } = props;

  const router = useRouter();

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
    console.log(props);

    const userId = dummyUser.id;

    if (userInterested) {
      await axios.delete(`/api/trips`, {
        data: { userId, listingId: listing.id },
      });
      removeUser(dummyUser.id);
    } else {
      await axios.post(`/api/trips`, {
        userIds: [userId],
        trip: {
          dateFrom,
          dateTo,
          status: 'pending',
          listingId: listing.id,
        },
      });
      addUser(dummyUser);
    }
  };

  const handleBook = async (e: React.MouseEvent) => {
    const userId = dummyUser.id;
    const res = await axios.get(
      `/api/trips?userId=${userId}&listingId=${listing.id}`
    );
    const trip = res.data;

    await loadTrip(trip);

    router.push('/book');
  };

  /** CONDITIONAL RENDERING **/
  const interestForm = userInterested ? (
    ''
  ) : (
    <>
      <label htmlFor="date-from">Checkin: </label>
      <input
        name="date-from"
        type="date"
        value={dateFrom}
        onChange={(e) => setDateFrom(e.target.value)}
        required
      ></input>
      <label htmlFor="date-to">Checkout: </label>
      <input
        name="date-to"
        type="date"
        value={dateTo}
        onChange={(e) => setDateTo(e.target.value)}
        required
      ></input>
    </>
  );

  const submitButtonText = userInterested
    ? ':/ No longer interested'
    : "I'm interested!";

  const bookButton = userInterested ? (
    <button onClick={handleBook}>Book now!</button>
  ) : (
    ''
  );

  return (
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

        {/* <div>
        <SectionHeader className="title">Interested Users</SectionHeader>
        <ul className="content">
          {users.map((user: any) => {
            return (
              <li key={user.id}>{`${user.firstName} ${user.lastName}`}</li>
            );
          })}
        </ul>
        <form name="set-user-interest" onSubmit={handleInterest}>
          {interestForm}
          <button type="submit">{submitButtonText}</button>
        </form>
        {bookButton}
      </div> */}

        <GuestPhotos>
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
        </Reviews>
      </Content>
    </Wrapper>
  );
};

SingleListing.getInitialProps = async function(context: any) {
  const users = await axios.get(apiUrl('/api/users'));
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
    tripToBook: state.tripToBook,
  };
};

const mapDispatch = (dispatch: any) => {
  return {
    getListing: bindActionCreators(getSingleListing, dispatch),
    addUser: bindActionCreators(addInterestedUser, dispatch),
    removeUser: bindActionCreators(removeInterestedUser, dispatch),
    loadTrip: bindActionCreators(loadTrip, dispatch),
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

const Wrapper = styled.div`
  margin: 0 1vw;
`;

const ImageGrid = styled.div`
  display: grid;
  max-height: 50vh;
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
