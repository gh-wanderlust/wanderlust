import React, { useState } from 'react';
import Link from 'next/link';
// @ts-ignore
import LinesEllipsis from 'react-lines-ellipsis';
import { connect } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';

interface ListingInterface {
  id: number;
  name: string;
  description: string;
  price: number;
  ownerPhotos: Array<string>;
  city: string;
}
import { apiUrl } from '../../util';

const Listings = (props: any) => {
  const [listings, setListings] = useState(props.listings);
  const [filtered, setFiltered] = useState(listings);
  const [dropDownVal, setDropDownVal] = useState('Anywhere');

  const handleChange = (e: any) => {
    setDropDownVal(e.target.value);

    if (e.target.value.toLowerCase() === 'anywhere') {
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
        <option value="osaka">Osaka</option>
        <option value="bora bora">Bora Bora</option>
        <option value="inverness">Inverness</option>
        <option value="test">TEST</option>
      </select>
      <h2>Listings</h2>
      {filtered.map((listing: ListingInterface) => {
        const pageUrl = `/listings/${listing.id}`;

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
                <p>X other people are interested</p>
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

const ListingBox = styled.div`
  font-family: Helvetica;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  background-color: white;
  border-radius: 10px;
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: 1fr 250px;
  cursor: pointer;
  max-height: 300px;
  max-width: 500px;
  overflow: hidden;

  .text {
    padding: 15px 30px;
  }

  img {
    height: 300px;
    display: block;
  }
`;

const TrimmedText = styled(LinesEllipsis)`
  padding: 0;
`;
