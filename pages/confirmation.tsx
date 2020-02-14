import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Confirmation = (props: any) => {
  const { bookedTrip } = props;
  console.log("BOOKEDTRIP: ", bookedTrip)
  return (
    <ConfirmationDetails>
      <h2>Get ready for your trip!</h2>
      <div>
        <iframe
          src="https://giphy.com/embed/toelXGUsYD6vtCN408"
          width="480"
          height="360"
          frameBorder="0"
        ></iframe>
      </div>
      <h2>Your confirmation number is {bookedTrip.id}</h2>
    </ConfirmationDetails>
  );
};

const mapState = (state: any) => {
  return { bookedTrip: state.bookedTrip };
};

export default connect(mapState)(Confirmation);

const ConfirmationDetails = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 70vh;
  padding: 2em;
`;
