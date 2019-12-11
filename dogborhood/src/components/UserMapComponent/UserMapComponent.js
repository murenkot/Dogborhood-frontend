import React from 'react';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"


const UserMapComponent = compose(
    withProps({
      googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API}`,
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )((props) =>
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: Number(props.lat), lng: Number(props.lng) }}
    >
        {/* {console.log( typeof Number(props.coordinates.latitude))} */}
      {props.isMarkerShown && <Marker position={{ lat: Number(props.lat), lng: Number(props.lng) }} />}
      {/* {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />} */}

    </GoogleMap>
  )

  export default UserMapComponent;  