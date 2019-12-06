import React from 'react';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"



const UserMapComponent = compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCn2Y3D6UIcU_NpTPal4dX528RsINwTnvM",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )((props) =>
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: Number(props.coordinates.latitude), lng: Number(props.coordinates.longitude) }}
    >
        {console.log( typeof Number(props.coordinates.latitude))}
      {props.isMarkerShown && <Marker position={{ lat: Number(props.coordinates.latitude), lng: Number(props.coordinates.longitude) }} />}
      {/* {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />} */}

    </GoogleMap>
  )

  export default UserMapComponent;  