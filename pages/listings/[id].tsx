import React from 'react';
import axios from 'axios';
import { connect } from "react-redux"
import loginUser from '../../store/store'
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
  const { listing } = props
  // console.log("LISTING IN COMPONENT: ", listing)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {

  }

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
          {listing.trips.map((trip: any) => {
            if (trip.status === 'pending') {
              return trip.users.map((user: any) => {
                return <li>{`${user.firstName} ${user.lastName}`}</li>;
              });
            }
          })}
        </ul>
        <button onClick={handleClick}>I'm interested!</button>
      </div>
    </div>
  );
};

SingleListing.getInitialProps = async function(context: any) {
  const user = {
      id: 10,
      firstName: "Moanna",
      lastName: "Mo",
      email: "moanna@ocean.com",
      password: "ocean"
    }
  // const getUser = () => store.dispatch(loginUser(user as any))
  context.store.dispatch(loginUser( user as any))
  const listingId = context.query.id
  const res = await axios.get(`https://wanderlust-rwnchen.gh-wanderlust.now.sh/api/listings/${listingId}?include=users`);
  const listing = res.data;
  return { listing };
};

export default connect(loadGetInitialProps)(SingleListing);
