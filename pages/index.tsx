import React, { useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import Link from 'next/link';
import { submitSearch } from '../store/store';
import { apiUrl } from '../util';
import { Listing } from '../server/db/models/interfaces';
import { Select } from 'grommet'
import { useRouter } from 'next/router';
import cookies from 'next-cookies';

import { logout } from '../util/auth';

const LandingPage = function(props: any) {
  const { loggedIn, cities, submitSearch } = props
  const [dropDownVal, setDropdownVal] = useState("Chicago");
  const router = useRouter();

  const handleChange = (option: any) => {
    setDropdownVal(option);
  };

  const handleSubmit = (e: any) => {
    submitSearch(dropDownVal)
    router.push('/listings');
  }

  return (
    <Wrapper>
        <SearchWrapper>
          <SearchForm>
            <h1>W.</h1>
            <h1>Find your next adventure.</h1>
            <Select 
              options={['Chicago', 'Montpelier', 'Miami']}
              onChange={({option}) => handleChange(option)}
              value={dropDownVal}
            />
            <Link href={'/listings'}>
            <SearchButton onClick={handleSubmit}>
              Search
            </SearchButton>
          </Link>
        </SearchForm>
      </SearchWrapper>
      <HeroImg
        alt="heroImg"
        src="https://c0.wallpaperflare.com/preview/732/704/957/mountain-snow-house-hillside.jpg"
      />
      <LoginButtonWrapper>
        {loggedIn ? (
          <Button
            onClick={() => {
              logout();
              router.push('/');
            }}
          >
            Logout
          </Button>
        ) : (
          <>
            <Link href={'/login'}>
              <Button>Log In</Button>
            </Link>
            <Link href={'/signup'}>
              <Button>Sign Up</Button>
            </Link>
          </>
        )}
      </LoginButtonWrapper>
    </Wrapper>
  );
};

const mapDispatch = (dispatch: Dispatch) => ({
  submitSearch: bindActionCreators(submitSearch, dispatch),
});

LandingPage.getInitialProps = async (context: any) => {
  const props: any = {};

  const { token } = cookies(context);
  if (token) props.loggedIn = token;
  else props.loggedIn = false;

  // const res = await axios.get(apiUrl('/api/listings'));
  console.log("API in landing: ", apiUrl('/api/listings'))
  // const listings = res.data;
  // const cities = listings.map((listing: Listing) => {
  //   return listing.city;
  // });
  // let uniqueList = [...new Set(cities)];
  // props.cities = uniqueList;

  return props;
};

export default connect(null, mapDispatch)(LandingPage);

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  z-index: 2;
`;

const SearchForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 50%;
  position: absolute;
  top: 200px;
  left: 80px;
`;

const Dropdown = styled.select`
  // box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`;

const DateInput = styled.input``;

const SearchWrapper = styled.div`
  padding: 50px;
  background: #ffffff;
  width: 28%;
  position: relative;
  top: 0;
  left: 0;
`;

const SearchButton = styled.button`
  background: #23565c;
  font-family: inherit;
  color: #ffffff;
  font-size: 1em;
  margin-top: 1.5em;
  padding: 1em;
  border: 2px solid darkgreen;
  border-radius: 3px;
  position: relative;
  width: 100%;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`;
const LoginButtonWrapper = styled.button`
  background: transparent;
  border: none;
  position: absolute;
  top: 30px;
  right: 50px;
`;

const Button = styled.button`
  font-family: inherit;
  background: transparent;
  color: white;
  font-size: 15px;
  margin: 1em;
  padding: 0.25em 1em;
  border: none;
  border-radius: 3px;
`;

const HeroImg = styled.img`
  height: 100%;
  width: 65%;
  position: absolute;
  top: 0;
  left: 35%;
`;
const ListingImg1 = styled.img`
  width: 100%;
  position: relative;
  top: 750px;
  left: 0;
`;

const ListingImg2 = styled.img`
  width: 100%;
  position: relative;
  top: 750px;
  left: 0;
`;
