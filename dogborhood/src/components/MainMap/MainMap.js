import React , { Component }  from 'react';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import GoogleMapReact from 'google-map-react';

import './MainMap.css';


// const MainMap = compose(
//     withProps({
//       googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCn2Y3D6UIcU_NpTPal4dX528RsINwTnvM",
//       loadingElement: <div style={{ height: `100%` }} />,
//       containerElement: <div style={{ height: `400px` }} />,
//       mapElement: <div style={{ height: `100%` }} />,
//     }),
//     withScriptjs,
//     withGoogleMap
//   )((props) =>
//     <GoogleMap
//       defaultZoom={14}
//       defaultCenter={{ lat: Number(props.coordinates.latitude), lng: Number(props.coordinates.longitude) }}
//     >
//         {console.log( typeof Number(props.coordinates.latitude))}
//       {props.isMarkerShown && <Marker position={{ lat: Number(props.coordinates.latitude), lng: Number(props.coordinates.longitude), text="It's me!!!" }} />}
//       {/* {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />} */}

//     </GoogleMap>
//   )

const MapMarker = ({ text, id, avatar, zoom }) => {
  let size = zoom*3.5;
  // let style = "width: " + size + "px; height: " + size + "px;";
  let style = {
    width: String(size) +'px',
    height: String(size) +'px',

  }
    return(
        <>
        {/* {console.log(style)} */}
            <div className="map-marker-container">
            <a href={"/user/"+id}>
                <div className="map-photo-container">
                {/* <div style={style} className="map-photo-container"> */}
                {/* <div style={{width: '100px', height: '100px'}} className="map-photo-container"> */}
                    <img src={avatar} />
                </div>
                <span>{text}</span></a>
            </div>
        </>
    )
};

class MainMap extends Component {

    state = {
        center: {
            lat: 59.95,
            lng: 30.33
            },
        zoom: 16
    };

  render() {
    return (
      <div style={{ height: '90vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API}` }}
          defaultCenter = {{
            lat: this.props.center_lat,
            lng: this.props.center_lng,
        }}
          defaultZoom={this.state.zoom}
        >
            {this.props.users && this.props.users.map(user=>
                 <MapMarker
                    key={user._id}
                    zoom={this.state.zoom}
                    lat={user.lat}
                    lng={user.lng}
                    text={user.dogName}
                    id={user._id}
                    avatar={user.avatar}
                    link="http://google.com" 
                />
            )}
          {/* <MapMarker
            lat={37.7802953}
            lng={-122.4667374}
            text="My Marker"
            // avatar={user.avatar}
            link="http://google.com"
          /> */}
        </GoogleMapReact>
      </div>
    );
  }
}

  export default MainMap;  