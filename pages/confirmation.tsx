import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';

const Confirmation = (props: any) => {
  const { bookedTrip } = props;
  return (
    <div>
      <h2>Your confirmation number is {bookedTrip.id}</h2>
      <Link href='/listings'>
        <a>Back to Listings</a>
      </Link>
    </div>
  );
};

const mapState = (state: any) => {
  return { bookedTrip: state.bookedTrip };
};
export default connect(mapState)(Confirmation);
