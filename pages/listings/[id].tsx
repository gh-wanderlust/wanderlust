import React from 'react';
import axios from 'axios';
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
//   listing: object;
// }

const SingleListing = (props: any) => {
  const { listing } = props
  // console.log("LISTING IN COMPONENT: ", listing)
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
        <ul>
          {console.log("TRIPS? ", listing.trips)}
          {/* {listing.trips.map((trip: object) => {
            console.log("WHAT IS TRIP: ", trip)
            // if (trip.status === 'pending') {
            //   return trip.users.map((user) => {
            //     return <li>{`${user.firstName} ${user.lastName}`}</li>;
            //   });
            // }
          })} */}
        </ul>
        <button>I'm interested!</button>
      </div>
    </div>
  );
};

SingleListing.getInitialProps = async function(context: any) {
  const listingId = context.query.id
  const bool = context.query.users
  const res = await axios.get(`https://wanderlust-rwnchen.gh-wanderlust.now.sh/api/listings/${listingId}?users=${bool}`);
  const listing = res.data;
  return { listing };
};

export default SingleListing;
