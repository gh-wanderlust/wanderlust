import React, { useState } from 'react';

import { connect } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import { Select, Grommet, DropButton, Box } from 'grommet';

import ListingBox from '../../components/ListingBox';
import SimpleMap from '../../components/Map';
import CitySelect from '../../components/CitySelect';

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
  const [dropDownVal, setDropDownVal] = useState('Chicago');
  const [zipCode, setZipCode] = useState('60657');


  const handleChange = ( option: any) => {
    setDropDownVal(option);
  
    const filteredListings = listings.filter((listing: ListingInterface) => {
      return listing.city.toLowerCase() === option.toLowerCase();
    });

    setZipCode(filteredListings[0].zipCode)
    setFiltered(filteredListings);
  };

  const selectTheme = {
    select: {
        background: 'white',
        container: {}
    }
  }

  

  return (
    <Wrapper>
      <Header>
        <HeaderFilter>
          <h1>W.</h1>
          <Grommet theme={selectTheme}>
            <Select options={['Chicago', 'Montpelier', 'Miami']} margin="medium" value={dropDownVal} onChange={({ option }) => handleChange(option)}/>
          </Grommet>
        </HeaderFilter>

        <HeaderPrefs>
          
        <Button
          label="Price"
          dropAlign={{ top: 'bottom' }}
          dropContent={
            <Box pad="large" background="light-2" />
          }
        />
          
        <Button
        label="Type of Place"
        dropAlign={{ top: 'bottom' }}
        dropContent={
          <Box pad="large" background="light-2" />
        }
        />
          
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
  grid-template-rows: max-content auto;
`;

const Header = styled.div`
  height: max-content;
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


const Button  = styled(DropButton)`
  background: white;
  font-size: 15px;
  padding:3px 10px;
  margin: 8px 10px 0px 0;
  white-space: nowrap;
  width: max-content;
  border: none;
`