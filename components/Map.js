import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import styled from 'styled-components'
import zipcodes from 'zipcodes'
import uuid from 'uuid';
// require('dotenv').config()

const AnyReactComponent = ({ text }) => <Marker>{''}</Marker>;

const SimpleMap = (props) => {
  const [zip, setZip] = useState(props.zipcode)

  console.log(props.zipcode)
  if (zip !== props.zipcode) {
    setZip(props.zipcode)
  }

  const mapCoords = zipcodes.lookup(zip)

  console.log(process.env.GOOGLE_MAPS_API_KEY )
    return (
      <Wrapper>
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
          center={{
            lat: mapCoords.latitude,
            lng: mapCoords.longitude
          }}
          defaultZoom={13}
        >


          {props.filteredListings.map(listing => {
            const coords = zipcodes.lookup(listing.zipCode)
            return (
              <Marker
                lat={coords.latitude}
                lng={coords.longitude}
                text="BETA MARKER"
                key={uuid()}
              >${listing.price / 100}</Marker>
            )
          })}
        </GoogleMapReact>
      </div>
      </Wrapper>
    );

}

export default SimpleMap;


  const Wrapper =styled.div`
  width: 100%;
  height: 100%;
  `
  const Marker = styled.div`
    border: 10px solid var(--accent-dark);
    box-sizing: border-box;
    background-color: var(--accent-dark);
    background-size: 30px 30px;
    height: 30px;
    width: 50px;
    border-radius: 16px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 12px;

    :hover {
      transform: scale(1.15);
      transform-origin: 50% 50% 0;
      transition: all 0.25s;
      box-shadow: lightgrey 0px 1px 1px;
    }
  `
