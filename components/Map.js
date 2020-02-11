import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import styled from 'styled-components'
import zipcodes from 'zipcodes'
// require('dotenv').config()

const AnyReactComponent = ({ text }) => <Marker>{''}</Marker>;

const SimpleMap = (props) => {
  const [zip, setZip] = useState(props.zipcode)
  // console.log('ZIP',zip)

  if (zip !== props.zipcode) {
    setZip(props.zipcode)
  }

  const coords = zipcodes.lookup(zip)
  // console.log('coords:', coords)


    return (
      <Wrapper>
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
          center={{
            lat: coords.latitude,
            lng: coords.longitude
          }}
          defaultZoom={16}
        >
          <AnyReactComponent
            lat={coords.latitude}
            lng={coords.longitude}
            text="BETA MARKER"
          />
        </GoogleMapReact>
      </div>
      </Wrapper>
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

  const Wrapper =styled.div`
  width: 100%;
  height: 100%;
  `
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
