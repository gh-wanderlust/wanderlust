import React, { useState } from 'react'
import { Dispatch } from 'redux';
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import styled from 'styled-components'
import axios from 'axios'
import Link from 'next/link'
import { submitSearch } from '../store/store'
import { apiUrl } from '../util'
import { Listing } from '../server/db/models/interfaces';
import { Select } from 'grommet'
import { useRouter } from 'next/router';

const LandingPage = function(props: any) {
  const { cities, submitSearch } = props
  const [dropDownVal, setDropdownVal] = useState("Chicago");
  const router = useRouter();

  const handleChange = (option: any) => {
    setDropdownVal(option);
  }

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
          <Link href={'/login'}><Button>Log In</Button></Link>
          <Link href={'/signup'}><Button>Sign Up</Button></Link>
        </LoginButtonWrapper>
      </Wrapper>
  )
}

const mapDispatch = (dispatch:Dispatch) => ({
  submitSearch: bindActionCreators(submitSearch, dispatch)
})

LandingPage.getInitialProps = async () => {
  const res = await axios.get(apiUrl('/api/listings'))
  const listings = res.data
  const cities = listings.map((listing: Listing) => {return listing.city})
  let uniqueList = [...new Set(cities)]
  return { cities: uniqueList}
}

export default connect(null, mapDispatch)(LandingPage);

const Wrapper = styled.div`
  display: grid;
`
const SearchForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 50%;
  position: absolute;
  top: 80px;
  left: 80px;
`

const SearchWrapper = styled.div`
  font-family: 'Lucida Console', sans-serif;
  padding: 50px;
  background: #ffffff;
  height: 86.5%;
  width: 28%;
  position: relative;
  top: 0;
  left: 0;
`

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
`
const LoginButtonWrapper = styled.button`
  background: transparent;
  border: none;
  position: absolute;
  top: 30px;
  right: 50px;
`

const Button = styled.button`
  font-family: inherit;  
  background: transparent;
  color: white;
  font-size: 15px;
  margin: 1em;
  padding: 0.25em 1em;
  border: none;
  border-radius: 3px;
`

const HeroImg = styled.img`
  height: 100%;
  width: 65%;
  position: absolute;
  top: 0;
  left: 35%;
`
