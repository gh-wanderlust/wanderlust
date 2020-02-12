import React, { useState } from 'react';

import { connect } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
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
  zipCode: string;
}
import { apiUrl } from '../../util';

const Listings = (props: any) => {
  const [listings, setListings] = useState(props.listings);
  const [filtered, setFiltered] = useState(
    listings.filter((listing: ListingInterface) => {
      return listing.city.toLowerCase() === 'chicago';
    })
  );
  const [dropDownVal, setDropDownVal] = useState('Anywhere');
  const [zipCode, setZipCode] = useState('60657');

  // const listingData: any = {};

  // filtered.forEach((listing: any) => {
  //   listingData[listing.zipCode] = listing;
  // });

  // console.log(listingData);

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
        case 'Montpelier':
          setZipCode('05602');
          break;
        case 'Miami':
          setZipCode('33131');
          break;
        default:
          setZipCode('10004');
      }

      setFiltered(filteredListings);
      // setMarkers(
      //   filteredListings.map((listing: ListingInterface) => {
      //     return listing.zipCode;
      //   })
      // );
    }
  };

  return (
    <Wrapper>
      <Header>
        <HeaderFilter>
          <h1>W.</h1>
          <select
            name="cities"
            id="cities"
            onChange={handleChange}
            value={dropDownVal}
          >
            <option value="chicago">Chicago</option>
            <option value="montpelier">Montpelier</option>
            <option value="miami">Miami</option>
          </select>
        </HeaderFilter>

        <HeaderPrefs>
          <button>Type of Place</button>
          <button>Price</button>
        </HeaderPrefs>
      </Header>

      <Content>
        <SimpleMap zipcode={zipCode} filteredListings={filtered} />

        <List>
          {filtered.map((listing: ListingInterface) => {
            const trips = listing.trips.filter((e) => e.status === 'pending');
            return (
              <ListingBox listing={listing} key={listing.id} trips={trips} />
            );
          })}
        </List>
      </Content>
    </Wrapper>
  );
};

Listings.getInitialProps = async function() {
  const res = await axios.get(apiUrl('/api/listings'));
  return { listings: res.data };
};

export default connect()(Listings);

const Wrapper = styled.div`
  color: var(--black);
  display: grid;
  grid-template-rows: 100px auto;
`;

const Header = styled.div`
  min-height: max-content;
  box-shadow: rgb(235, 235, 235) 0px 1px 1px;
  padding: 0 5vw 1vh 5vw;
  background-color: var(--accent-dark);
  position: sticky;
  top: 0;
`;

const HeaderFilter = styled.div`
  display: flex;
  align-items: center;
  max-height: 6vh;
`;

const HeaderPrefs = styled.div`
  border-top: 1px solid var(--accent-light);
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  overflow: hidden;
  height: 90vh;
`;

const List = styled.div`
  overflow-y: scroll;
`;
