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
  // constructor(props: Props) {
  //   super(props)
  //   this.handleChange = this.handleChange.bind(this)
  // }

  // handleChange = (e: any) => {
  //   console.log('EVENT TARGET: ', e.target.value)
  // }

  render() {
    return (
      <div>
        <SearchWrapper>
          <p>Logo</p>
          <h1>Find your next adventure.</h1>
          <SearchForm>
            Select your destination
            <select name="cities" id="cities">
              <option value="anywhere">Anywhere</option>
              <option value="osaka">Osaka</option>
              <option value="bora bora">Bora Bora</option>
              <option value="inverness">Inverness</option>
            </select>
            From
            <input type="date" name="fromDate"></input>
            To
            <input type="date" name="toDate"></input>
          </SearchForm>
          <SearchButton onClick={() => this.props.submitSearch()}>
            Search
          </SearchButton>
        </SearchWrapper>
        <div>
          <HeroImg
            alt="heroImg"
            src="https://c0.wallpaperflare.com/preview/732/704/957/mountain-snow-house-hillside.jpg"
          />
        </div>
        <LoginButtonWrapper>
          <LoginButton>Log In</LoginButton>
          <LoginButton>Sign Up</LoginButton>
        </LoginButtonWrapper>
      </div>
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

const SearchWrapper = styled.div`
  font-family: 'Lucida Console', sans-serif;
  padding: 50px;
  background: #FFFFFF;
  height: 100%;
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
  top: 190px;
  left: 50px;
`

const SearchButton = styled.button`
  background: #23565c;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid darkgreen;
  border-radius: 3px;
  position: absolute;
  top: 350px;
  left: 35px;
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
  left: 35%;
  top: 0;
`
