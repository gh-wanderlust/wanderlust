import React, { useState } from 'react';

import { connect } from 'react-redux';
import axios from 'axios';
import cookies from 'next-cookies';

import ListingBox from '../../components/ListingBox';
import SimpleMap from '../../components/Map';

interface ListingInterface {
  id: number;
  name: string;
  description: string;
  price: number;
  ownerPhotos: Array<string>;
  city: string;
  trips: Array<any>;
}
import { apiUrl } from '../../util';

const Listings = (props: any) => {
  const [listings, setListings] = useState(props.listings);
  const [filtered, setFiltered] = useState(listings);
  const [dropDownVal, setDropDownVal] = useState('Anywhere');
  const [zipCode, setZipCode] = useState('10004');

  const handleChange = (e: any) => {
    setDropDownVal(e.target.value);

    if (e.target.value.toLowerCase() === 'anywhere') {
      setFiltered(listings);
    } else {
      const filteredListings = listings.filter((listing: ListingInterface) => {
        return listing.city.toLowerCase() === e.target.value.toLowerCase();
      });

      switch (filteredListings[0].city) {
        case 'Chicago':
          setZipCode('60657');
          break;
        default:
          setZipCode('10004');
      }

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
        const pageUrl = `/listings/${listing.id}`;
        const trips = listing.trips.filter((e) => e.status === 'pending');

        return <ListingBox listing={listing} />;
      })}
    </div>
  );
};

Listings.getInitialProps = async function(context: any) {
  const res = await axios.get(apiUrl('/api/listings'));
  const props = { listings: res.data, loggedIn: '' };

  const { token } = cookies(context);
  if (token) props.loggedIn = token;

  return props;
};

export default connect()(Listings);
