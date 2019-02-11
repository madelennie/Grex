import React from 'react';

const LandingPage = () => (
  <div>
    <h1>LandingPage</h1>
  </div>
);



export default LandingPage;




// import React, { Component } from "react";
// import { compose } from "recompose";

// import { Map, TileLayer, Marker, Popup } from "react-leaflet";

// import { withFirebase } from "../Firebase";
// import { withAuthorization,AuthUserContext, withEmailVerification } from "../Session";
// import L from "leaflet";
// import { GeolocatedProps, geolocated } from "react-geolocated";
// import "./map.css";


// var myIcon = L.icon({
//   iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
//   iconSize: [25, 41],
//   iconAnchor: [12.5, 41],
//   popupAnchor: [0, -41]
// });

// const MapPage = () => (
//   <div>

//     <h1>Home Page</h1>
//     <p>The Home Page is accessible by every signed in user.</p>

//     <Locations />
//   </div>
// );

//  class LocationMap extends Component  {

//   constructor(props) {
//     super(props);

//     this.state = {
//       location: {
//         lat: 51.505,
//         lng: -0.09
//       },
//       haverUsersLocation: false,
//       zoom: 2
//     };
//   }

//   componentDidMount(props) {
//     navigator.geolocation.getCurrentPosition(
//       position => {
//         this.setState({
//           location: {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//           },

//           setView: true,
//           watch: true,
//           haverUsersLocation: true,
//           zoom: 13
//         });
//       },
//       () => {
//         console.log("No location given");
//         fetch("https://ipapi.co/json")
//           this.props.firebase
//           .then(res => res.json())
//           .then(authUser => {
//               this.setState({
//                 location: {
//                   lat: authUser.latitude,
//                   lng: authUser.longitude
//                 },
//                 haverUsersLocation: true,
//                 zoom: 13
//               });
//             ;
//           });
//           return this.props.firebase
//       }
//     );
//   }

//   render() {
//     const position = [this.state.location.lat, this.state.location.lng];
//     return (

// <div
//         style={{
//           fontSize: "large",
//           fontWeight: "bold",
//           margin: "2rem"
//         }}
//       >
//         {!this.props.isGeolocationAvailable ? (
//           <div>Your browser does not support Geolocation</div>
//         ) : !this.props.isGeolocationEnabled ? (
//           <div>Geolocation is not enabled</div>
//         ) : this.props.coords ? (
//           <table>
//             <tbody>
//               <tr>
//                 <td>latitude</td>
//                 <td>{this.props.coords.latitude}</td>
//               </tr>
//               <tr>
//                 <td>longitude</td>
//                 <td>{this.props.coords.longitude}</td>
//               </tr>
//             </tbody>
//           </table>
//         ) : (
//           <div>Getting the location data&hellip; </div>
//         )}{" "}

//       <Map className="mapId" center={position} zoom={this.state.zoom}>
//         <TileLayer
//           attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         {this.state.haverUsersLocation ? (
//           <Marker position={position} icon={myIcon}>
//             <Popup>
//               A pretty CSS3 popup. <br /> Easily customizable.
//             </Popup>
//           </Marker>

//         ) : (
//           ""
//         )}

//       </Map>
//       </div>

//     )}

// }

// const Locations = withFirebase(LocationMap);
// const condition = authUser => !!authUser;

// export default compose(
//   withAuthorization(condition),
//   geolocated()
// )(MapPage);

//  geolocated({
//   positionOptions: {
//     enableHighAccuracy: false,
//   },
//   userDecisionTimeout: 5000,
// })(LocationMap);