import React from "react";
import { connect } from "react-redux";
import axios from "axios";

interface ListingInterface {
  id: number;
  name: string;
  description: string;
  price: number;
  ownerPhotos: Array<string>;
  city: string;
}

const Listings = (props: any) => {
  return (
    <div>
      <p>Listings</p>
      {props.listings.map((listing: ListingInterface) => {
        return (
          <div key={listing.id}>
            <p>{listing.name}</p>
          </div>
        );
      })}
    </div>
  );
};

// const mapStateToProps = (state: any) => {
//   return {
//     data: state
//   };
// };

Listings.getInitialProps = async function() {
  // const res = await axios.get("https://api.tvmaze.com/search/shows?q=batman");
  // const instance = axios.create({ baseURL: "http://localhost:3000" });

  // const res = await instance.get("/api/listings");
  const res = await axios.get(
    "https://wanderlust-rwnchen.gh-wanderlust.now.sh/api/listings"
  );

  return { listings: res.data };
};

export default connect()(Listings);
