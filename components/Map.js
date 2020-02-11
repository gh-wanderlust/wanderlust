import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import styled from 'styled-components'
import zipcodes from 'zipcodes'
import uuid from 'uuid';
// require('dotenv').config()

const AnyReactComponent = ({ text }) => <Marker>{''}</Marker>;

const SimpleMap = (props) => {
  const [zip, setZip] = useState(props.zipcode)

  if (zip !== props.zipcode) {
    setZip(props.zipcode)
  }

  const mapCoords = zipcodes.lookup(zip)
  console.log('mapCoords:', mapCoords)

  const {markers} = props
  const markerCoords = markers.map(zip => zipcodes.lookup(zip))
  // console.log('markerCoords:', markerCoords)

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


          {markerCoords.map(coord => {
            return (
              <AnyReactComponent
                lat={coord.latitude}
                lng={coord.longitude}
                text="BETA MARKER"
                key={uuid()}
              />
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
    background-color: var(--accent-dark);
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
