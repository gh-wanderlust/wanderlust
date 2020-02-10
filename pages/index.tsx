import React from "react";
import { connect } from "react-redux";
// import { getTest } from "../store/store";
import styled from 'styled-components'

interface LinkStateProps {
  state: Array<string>;
}

interface LinkDispatchProps {
  testDispatch: () => void;
}

type Props = LinkStateProps & LinkDispatchProps;

class Index extends React.Component<Props> {
  render() {
    return (
      <Wrapper>

        <p>Logo</p>
        <h1>Find your next adventure.</h1>
        <form>
          Where
          <input type="text" name="where"></input>
          From
          <input type="date" name="fromDate"></input>
          To
          <input type="date" name="toDate"></input>

        </form>
        <Button onClick={() => this.props.testDispatch()}>Search</Button>
        <div>
          <HeroImg alt="heroImg" src="https://c0.wallpaperflare.com/preview/732/704/957/mountain-snow-house-hillside.jpg"/>
        </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: Array<string>) => ({
  state: state,
});

const mapDispatchToProps = (dispatch: any) => ({
  testDispatch: () => {},
});
export default connect(mapStateToProps, mapDispatchToProps)(Index);


const Wrapper = styled.div`
  padding: 1em;
  border: black;
  background: #purple;
`;

const HeroImg = styled.img`
  height: 50%;
  width: 50%;
`;

const GuestPhotos = styled.div`
  display: flex;
  width: 97vw;
`;
const ProfilePic = styled.img`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  object-fit: cover;
`;

const Button = styled.button`
  background: green;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid darkgreen;
  border-radius: 3px;
`;



