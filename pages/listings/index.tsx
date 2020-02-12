import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import { Select, Grommet, DropButton, Box } from 'grommet';
import Link from 'next/link'
import { useRouter } from 'next/router';

import cookies from 'next-cookies';
import { apiUrl } from '../../util';
import ListingBox from '../../components/ListingBox';
import SimpleMap from '../../components/Map';

import {logout} from '../../util/auth'

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


const Listings = (props: any) => {
  const router = useRouter();
  let city = props.listing.selectedCity

  if (!city) {
    city = "Chicago"
  }
  
  let initialFiltered = props.listings.filter((listing: ListingInterface) => {
      return listing.city.toLowerCase()  === city.toLowerCase() ;
  })

  let initialZip
  
  
  if (city === 'Chicago') {
    initialZip='60657'
  } else if (city === 'Montpelier'){
    initialZip='05602'
  } else {
     initialZip='33131'
  }
  

  

  const [listings, setListings] = useState(props.listings);
  const [filtered, setFiltered] = useState(initialFiltered);
  const [dropDownVal, setDropDownVal] = useState(props.listing.selectedCity);
  const [zipCode, setZipCode] = useState(initialZip);


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
          <div>
            <h1>W.</h1>
            <Grommet theme={selectTheme}>
              <Select options={['Chicago', 'Montpelier', 'Miami']} margin="medium" value={dropDownVal} onChange={({ option }) => handleChange(option)}/>
            </Grommet>
          </div>

          <div>
          <Link href='/accountOverview'>
            <a>Profile</a>
          </Link>

          <Link href='/'>
            <a onClick={() => {
              logout()
              router.push('/')
            }}>Log Out</a>
          </Link>
          </div>
        </HeaderFilter>

        <HeaderPrefs>
          
        {/* <Button
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
        /> */}
          
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

const mapStateToProps =(state:any) => ({
  listing: state.listing
})

export default connect(mapStateToProps)(Listings);

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
  justify-content: space-between;
  margin-top: 20px;

  div {
    display: flex;
  }

  a {
    color: white;
    margin-right: 10px;
    :visited {
      color: white; 
    }
  }
`;

const HeaderPrefs = styled.div`
  /* border-top: 1px solid var(--accent-light); */
  height: 10px;
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