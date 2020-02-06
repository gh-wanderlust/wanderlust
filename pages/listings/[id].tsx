import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface ListingData {
  name: string;
  description: string;
  address: string;
  city: string;
  country: string;
}

interface ListingProps {
  listing: object;
}

const SingleListing = (props: ListingProps) => {
  const { listing } = props
  console.log(listing)
  return (
    <div>
      {/* <div>
        {listing.ownerPhotos.map((imgUrl) => {
          return <img src={imgUrl} />;
        })}
      </div>
      <div>
        <h2>{listing.name}</h2>
        <p>{listing.description}</p>
      </div>
      <div>
        <ul>
          {listing.trips.map((trip) => {
            if (trip.status === 'pending') {
              return trip.users.map((user) => {
                return <li>{`${user.firstName} ${user.lastName}`}</li>;
              });
            }
          })}
        </ul>
        <button>I'm interested!</button>
      </div> */}
    </div>
  );
};

SingleListing.getInitialProps = async () => {
  const router = useRouter();
  const { id } = router.query;
  const res = await axios.get(`https://wanderlust-rwnchen.gh-wanderlust.now.sh/api/listings/${id}?users=true`);
  console.log('RES: ', res);
  const listing = res.data;

  return { listing };
};

export default SingleListing;
