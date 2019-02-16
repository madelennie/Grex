import styled, {createGlobalStyle} from "styled-components"


 const GridStyle = styled.div`

        display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    justify-content: center;
    flex-direction: row;
    /* color: ${props => (props.whiteColor ? 'white' : 'black')}; */


  }
`

// import { Map, TileLayer, Marker, Popup } from "react-leaflet";

// import { withFirebase } from "../Firebase";
// import { withAuthorization,AuthUserContext, withEmailVerification } from "../Session";
// import L from "leaflet";

// import { GeolocatedProps, geolocated } from "react-geolocated";

// import React, { Component } from "react";
// import { compose } from "recompose";
// import { AuthUserContext, withAuthorization } from "../Session";
// import { withFirebase } from "../Firebase";


// var myIcon = L.icon({
//   iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
//   iconSize: [25, 41],
//   iconAnchor: [12.5, 41],
//   popupAnchor: [0, -41]
// });

// class LocatedTwo extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {

//       dbCoords: null
//     };
//   }

//   calculateDistance = (lat1, lon1, lat2, lon2) => {
//     var R = 6371; // km (change this constant to get miles)
//     var dLat = ((lat2 - lat1) * Math.PI) / 180;
//     var dLon = ((lon2 - lon1) * Math.PI) / 180;
//     var a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos((lat1 * Math.PI) / 180) *
//         Math.cos((lat2 * Math.PI) / 180) *
//         Math.sin(dLon / 2) *
//         Math.sin(dLon / 2);
//     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     var d = R * c;

//     return Math.round(d * 1000);
//   };

//   updatePosition = position => {
//     this.setState({ dbCoords: position.coords });
//     if (position.coords && this.state.dbCoords) {
//       const { latitude: lat1, longitude: lng1 } = this.state.dbCoords;
//       const { latitude: lat2, longitude: lng2 } = this.state.dbCoords;
//       const dist = this.calculateDistance(lat1, lng1, lat2, lng2);

//         this.writeUserPositionToDB(this.state.dbCoords);

//     }
//   };

//   getUserPositionFromDB = () => {
//     this.props.firebase
//       .user(this.props.userId)
//       .child("position")
//       .once("value", snapshot => {
//         const userPosition = snapshot.val();
//         console.log(JSON.parse(JSON.stringify(userPosition)));
//         this.setState({ dbCoords: userPosition });
//       });
//   };
//   writeUserPositionToDB = position => {
//     const { latitude, longitude } = position;

//     this.props.firebase
//       .user(this.props.userId)
//       .update({ position: { lat: latitude, lng: longitude } });
//     //this.setState({ dbCoords: position });
//     this.getUserPositionFromDB();
//   };

//   componentDidMount() {
//     this.getUserPositionFromDB();
//     this.watchId = navigator.geolocation.watchPosition(
//       this.updatePosition,
//       error => {
//         console.log("error" + error);
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 20000,
//         maximumAge: 0,
//         distanceFilter: 1
//       }
//     );
//   }
//   componentWillUnmount() {
//     navigator.geolocation.clearWatch(this.watchId);
//   }

//   render() {
//     const position = [this.state.location.lat, this.state.location.lng];
//    return (

// <div
//        style={{
//          fontSize: "large",
//          fontWeight: "bold",
//          margin: "2rem"
//        }}
//      >
//        {!this.props.isGeolocationAvailable ? (
//          <div>Your browser does not support Geolocation</div>
//        ) : !this.props.isGeolocationEnabled ? (
//          <div>Geolocation is not enabled</div>
//        ) : this.props.coords ? (
//          <table>
//            <tbody>
//              <tr>
//                <td>latitude</td>
//                <td>{this.props.coords.latitude}</td>
//              </tr>
//              <tr>
//                <td>longitude</td>
//                <td>{this.props.coords.longitude}</td>
//              </tr>
//            </tbody>
//          </table>
//        ) : (
//          <div>Getting the location data&hellip; </div>
//        )}{" "}

//      <Map className="mapId" center={position} zoom={this.state.zoom}>
//        <TileLayer
//          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//        />
//        {this.state.haverUsersLocation ? (
//          <Marker position={position} icon={myIcon}>
//            <Popup>
//              A pretty CSS3 popup. <br /> Easily customizable.
//            </Popup>
//          </Marker>

//        ) : (
//          ""
//        )}

//      </Map>

//      </div>

//    )}

//   render() {
//     return (
//       <div>
//         <div>Geolocation</div>
//         <div>
//           <p>Coords from Browser</p>
//           <Coords position={this.state.browserCoords} />
//           <p>Coords from DB</p>
//           <Coords position={this.state.dbCoords} />
//         </div>
//       </div>
//     );
//   }
// }

// const Coords = props => (
//   <div>
//     {props.position ? (
//       <div>
//         <div>{props.position.latitude}</div>
//         <div>{props.position.longitude}</div>
//       </div>
//     ) : null}
//   </div>
// );

// class MapPage extends Component {
//   constructor(props) {
//       super(props);

//       this.state = {
//         users: null
//       };
//     }
// render() {
//   return (
//       <AuthUserContext.Consumer>
//               {authUser => (
//               <LocatedTwo userId={authUser.uid} firebase={this.props.firebase} />
//               )}
//       </AuthUserContext.Consumer>
//   )}
// }

// const condition = authUser => !!authUser;
// export default compose(
// withFirebase,
// withAuthorization(condition)
// )(MapPage);






// export default GridStyle


// import React, { Component } from "react";
// import { compose } from "recompose";

// import { Map, TileLayer, Marker, Popup } from "react-leaflet";

// import { withFirebase } from "../Firebase";
// import { withAuthorization,AuthUserContext, withEmailVerification } from "../Session";
// import L from "leaflet";
// import { GeolocatedProps, geolocated } from "react-geolocated";
// import "./map.css";
// import { functions } from "firebase";


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
//     navigator.geolocation.watchPosition(
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
// this.writeUserPositionToDB()

//     );

//   }
//   writeUserPositionToDB = position => {

//     this.props.firebase
//       .user(this.props.userId)
//       .update({ position: { latitude: this.state.location.lat, longitude: this.state.location.lng } });
//        }

//   render() {
//      const position = [this.state.location.lat, this.state.location.lng];
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
// export {Locations}
// export default compose(
//   withAuthorization(condition),

//   geolocated()
// )(LocationMap,MapPage);

//  geolocated({
//   positionOptions: {
//     enableHighAccuracy: false,
//   },
//   userDecisionTimeout: 5000,
//   watchPosition: true
// })(LocationMap);


// import React, {Component} from 'react'
// import {GoogleApiWrapper,Map, InfoWindow, Marker} from 'google-maps-react';

// import styled from 'styled-components'

// export class MapContainer extends React.Component {
//     state = { userLocation: { lat: 32, lng: 32 }, loading: true };

//     componentDidMount(props) {
//       navigator.geolocation.getCurrentPosition(
//         position => {
//           const { latitude, longitude } = position.coords;

//           this.setState({
//             userLocation: { lat: latitude, lng: longitude },
//             loading: false
//           });
//         },
//         () => {
//           this.setState({ loading: false });
//         }
//       );
//     }

//     render() {
//       const { loading, userLocation } = this.state;
//       const { google } = this.props;

//       if (loading) {
//         return null;
//       }

//       return  (

//         <StyledLink google={google} initialCenter={userLocation} zoom={15}  >
//         <Marker onClick={this.onMarkerClick}
//         name={'Current location'}

//         // style={{width: '10px', height: '10px', position: 'relative'}}

//         />

//         </StyledLink>

//       )

//     }

//   }
//   const StyledLink = styled(Map)`
//   width: 100px;
//    height: 100px;
//     position: 'relative'
// `;

//   export default GoogleApiWrapper({
//     apiKey: ('AIzaSyD0oidugzEaE2AdgBxbfU9KluBBJlpeHkQ')
//   })(MapContainer)
