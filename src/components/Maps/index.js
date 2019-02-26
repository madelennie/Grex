import React, { Component } from "react";
import { compose } from "recompose";

import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import { withFirebase } from "../Firebase";
import { withAuthorization,AuthUserContext } from "../Session";

import L from "leaflet";
import "./map.css";

import {  geolocated } from "react-geolocated";
import ReactDOMServer from 'react-dom/server';

var myIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41]
});

export  class LocationMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedCoords: null,
      dbCoords: null
    }

  }
  handleClick = event => {
    const { lat, lng } = event.latlng
    console.log(`Clicked at ${lat}, ${lng}`)
    this.setState({ clickedCoords: { lat: lat, lng: lng }});
  }
  calculateDistance = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // km (change this constant to get miles)
    var dLat = ((lat2 - lat1) * Math.PI) / 180;
    var dLon = ((lon2 - lon1) * Math.PI) / 180;
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return Math.round(d * 1000);
  };

  updatePosition = position => {
    console.log('FIRST3')
    this.setState({
      dbCoords: {
      latitude: position.coords.latitude,
        longitude: position.coords.longitude
     }
    });
    if (position.coords && this.state.dbCoords) {
      const { latitude: lat1, longitude: lng1 } = this.state.dbCoords;
      console.log('lat1!!!!!!!!',this.state.dbCoords)

      const dist = this.calculateDistance(lat1, lng1);

        this.writeUserPositionToDB(this.state.dbCoords);

    }
  };
  handleLocalClick = event => {


    this.props.handleClick(event);

  }
  getUserPositionFromDB = () => {
    console.log('FIRST2')
    this.props.firebase
      .user(this.props.userId)
      .child("position")
      .on("value", snapshot => {
        const userPosition = snapshot.val();
        console.log('userposition',userPosition);
        this.setState({ dbCoords: userPosition });
      });
  };
  writeUserPositionToDB = position => {
    console.log('FIRST4')
    const { latitude, longitude } = position;

    this.props.firebase
      .user(this.props.userId)
      .update({ position: { lat: latitude, lng: longitude } });
    //this.setState({ dbCoords: position });
    this.getUserPositionFromDB();
  };

  componentDidMount() {
    console.log('FIRST1',this.props.userId.userPosition)
    this.getUserPositionFromDB();
    this.watchId = navigator.geolocation.watchPosition(
      this.updatePosition,
      error => {
        console.log("error" + error);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
        distanceFilter: 1,
        setView: true,
          watch: true,
          haverUsersLocation: true,
          zoom: 13

      }
    );
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {


    const markers = [

    ];
    markers.push(this.state.dbCoords)
    if (this.state.clickedCoords) {

      markers.push(this.state.clickedCoords);
      console.log('IS THIS WORING=',markers)
    }
   return (


      <div>
        {this.state.dbCoords ? (

          <MyMap handleClick={this.handleClick}
          markers={markers}
            position={Object.values(this.state.dbCoords)}
            icon={myIcon}
            zoom={13}
          />
         

        ) : null}
        <div>Geolocation</div>
        <div>
          <p>Coords from Browser</p>
          <Coords position={this.userPosition} />
          <p>Coords from DB</p>
          <Coords position={this.state.dbCoords} />
        </div>
      </div>
    );
  }
}

  const MyMap = props => (
    <Map
      zoomControl={false}
      scrollWheelZoom={false}
      center={props.position}
      zoom={props.zoom}
      onClick={props.handleClick}
      icon={myIcon}
    >
      <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
    />
    {props.markers.map(marker => (
      <Marker position={Object.values(marker)}icon={myIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    ))}

    </Map>
  );

const Coords = props => (
  <div>
    {props.position ? (
      <div>
        <div>{props.position.latitude}</div>
        <div>{props.position.longitude}</div>
      </div>
    ) : null}
  </div>
);

class MapPage extends Component {
  constructor(props) {
      super(props);

      this.state = {
        users: null
      };
    }
render() {
  return (
    <div>
      <h1>Map</h1>
      <AuthUserContext.Consumer>
              {authUser => (
              <LocationMap userId={authUser.uid} firebase={this.props.firebase} />
              )}
      </AuthUserContext.Consumer>
    </div>


  )}
}
const condition = authUser => !!authUser;

export default compose(
withFirebase,
withAuthorization(condition),
geolocated()

)(MapPage);

geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
  watchPosition: true
})(LocationMap);