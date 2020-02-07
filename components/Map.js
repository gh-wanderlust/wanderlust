import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import styled from 'styled-components'
import zipcodes from 'zipcodes'
// require('dotenv').config()

const AnyReactComponent = ({ text }) => <Marker>{''}</Marker>;

const SimpleMap = (props) => {
  console.log(props.zipcode)

  const coords = zipcodes.lookup(props.zipcode)
  console.log('coords:', coords)


    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '400px', width: '400px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
          defaultCenter={{
            lat: coords.latitude,
            lng: coords.longitude
          }}

          defaultZoom={11}
        >
          <AnyReactComponent
            lat={coords.latitude}
            lng={coords.longitude}
            text="BETA MARKER"
          />
        </GoogleMapReact>
      </div>
    );

}

export default SimpleMap;

// static defaultProps = {
  //   center: {
  //     lat: 59.95,
  //     lng: 30.33
  //   },
  //   zoom: 11
  // };

  const Marker = styled.div`
    background-image: url('https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=912&q=80');
    background-size: 30px 30px;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    border: 2px solid papayawhip;

:hover {
  height: 35px;
    width: 35px;
    background-size: 35px 35px;
    transition: all 0.25s;
}
  `
