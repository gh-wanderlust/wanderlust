import React, { useState } from 'react';

import { connect } from 'react-redux';
import axios from 'axios';

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

        return (
          <Link href={pageUrl} key={listing.id}>
            <ListingBox>
              <div className="text">
                <h3>{listing.name}</h3>
                {/* <p id="desc">{listing.description}</p> */}
                <TrimmedText
                  text={listing.description}
                  maxLine="3"
                  ellipsis="..."
                  basedOn="letters"
                />
                <p>{listing.price || '$0'}/night</p>
                <p>
                  {trips.length
                    ? trips.length + ' other traveler(s) interested!'
                    : ''}
                </p>
              </div>

              <img src={listing.ownerPhotos[0]} alt="" />
            </ListingBox>
          </Link>
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
  // const res = await instance.get("/api/listings");
  const res = await axios.get(apiUrl('/api/listings'));

  return { listings: res.data };
};

export default connect()(Listings);
