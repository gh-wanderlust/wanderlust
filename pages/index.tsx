import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import Link from 'next/link'
// import { getTest } from "../store/store";

interface LinkStateProps {
  state: Array<string>
}

interface LinkDispatchProps {
  submitSearch: () => void
}

type Props = LinkStateProps & LinkDispatchProps

class Index extends React.Component<Props> {

  render() {
    return (
      <Wrapper>
        <SearchWrapper>
          <Headline>
            <h1>W.</h1>
            <h1>Find your next adventure.</h1>
          </Headline>
          <SearchForm>
            Select your destination:
            <Dropdown name="cities" id="cities">
              <option value="anywhere">Anywhere</option>
              <option value="osaka">Osaka</option>
              <option value="bora bora">Bora Bora</option>
              <option value="inverness">Inverness</option>
            </Dropdown>
            From
            <DateInput type="date" name="fromDate"></DateInput>
            To
            <DateInput type="date" name="toDate"></DateInput>
          </SearchForm>
          <Link href={'/listings'}>
            <SearchButton onClick={() => this.props.submitSearch()}>
              Search
            </SearchButton>
          </Link>
        </SearchWrapper>
        <HeroImg
          alt="heroImg"
          src="https://c0.wallpaperflare.com/preview/732/704/957/mountain-snow-house-hillside.jpg"
        />
        <LoginButtonWrapper>
          <Link href={'/login'}><LoginButton>Log In</LoginButton></Link>
          <Link href={'/signup'}><LoginButton>Sign Up</LoginButton></Link>
        </LoginButtonWrapper>
        <ListingImg1 src="https://images.unsplash.com/photo-1511840636560-acee95b3a83f" />
        <ListingImg2 src="https://images.unsplash.com/photo-1534351590666-13e3e96b5017" />
      </Wrapper>
    )
  }
}

const mapStateToProps = (state: Array<string>) => ({
  state: state
})

const mapDispatchToProps = (dispatch: any) => ({
  submitSearch: () => {}
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)

const Wrapper = styled.div`
  display: grid;
`
const Headline = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 50%;
  position: absolute;
  top: 80px;
  left: 80px;
`

const Dropdown = styled.select`
  // box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`

const DateInput = styled.input``

const SearchWrapper = styled.div`
  padding: 50px;
  background: #ffffff;
  height: 86.5%;
  width: 28%;
  position: absolute;
  top: 0;
  left: 0;
`
const SearchForm = styled.form`
  display: grid;
  grid-template-columns: 300px;
  grid-template-rows: 25px 25px 25px auto;
  position: absolute;
  top: 280px;
  left: 80px;
`
const SearchButton = styled.button`
  background: #23565c;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid darkgreen;
  border-radius: 3px;
  position: relative;
  top: 400px;
  left: 225px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`
const LoginButtonWrapper = styled.button`
  background: transparent;
  border: none;
  position: absolute;
  top: 30px;
  right: 50px;
`

const LoginButton = styled.button`
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
const ListingImg1 = styled.img`
  width: 100%;
  position: relative;
  top: 750px;
  left: 0;
`

const ListingImg2 = styled.img`
  width: 100%;
  position: relative;
  top: 750px;
  left: 0;
`
