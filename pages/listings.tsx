import React, { useState } from "react";

import { connect } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import ListingBox from "../components/ListingBox";
import SimpleMap from "../components/Map";

interface ListingInterface {
  id: number;
  name: string;
  description: string;
  price: number;
  ownerPhotos: Array<string>;
  city: string;
}

const Listings = (props: any) => {
  const [listings, setListings] = useState(props.listings);
  const [filtered, setFiltered] = useState(listings);
  const [dropDownVal, setDropDownVal] = useState("Anywhere");
  const [zipCode, setZipCode] = useState("10004");

  const handleChange = (e: any) => {
    setDropDownVal(e.target.value);
    setZipCode("10704");

    if (e.target.value.toLowerCase() === "anywhere") {
      setFiltered(listings);
    } else {
      const filteredListings = listings.filter((listing: ListingInterface) => {
        return listing.city.toLowerCase() === e.target.value.toLowerCase();
      });

      setFiltered(filteredListings);
    }
  };

  return (
    <div>
      <select
        name="cities"
        id="cities"
        onChange={handleChange}
        value={dropDownVal}
      >
        <option value="anywhere">Anywhere</option>
        <option value="chicago">Chicago</option>
        <option value="montpelier">Montpelier</option>
        <option value="miami">Miami</option>
      </select>

      <h2>Listings</h2>

      <SimpleMap zipcode={zipCode} />

      {filtered.map((listing: ListingInterface) => {
        return <ListingBox listing={listing} key={listing.id} />;
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
  // const res = await instance.get("/api/listings");
  const res = await axios.get(
    "https://wanderlust-rwnchen.gh-wanderlust.now.sh/api/listings"
  );

  return { listings: res.data };
};

export default connect()(Listings);
