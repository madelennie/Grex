import React, { Component, createRef } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';

import { withFirebase } from '../Firebase';
import Icon from './SVGIconComponent';

class LocatedTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      browserCoords: null,
      dbCoords: null,
      users: [],
      loading: false,
      perc: 0,
      markers: [],
    };
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
    this.setState({
      browserCoords: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    });
    if (position.coords && this.state.dbCoords) {
      const { latitude: lat1, longitude: lng1 } = position.coords;
      const { latitude: lat2, longitude: lng2 } = this.state.dbCoords;
      const dist = this.calculateDistance(lat1, lng1, lat2, lng2);
      if (dist > 1) {
        this.writeUserPositionToDB(position.coords);
      }
    }
  };

  getRandomNumber = () => {
    return Math.floor(Math.random() * 100) + 1             
  }

  makeMarkers = (users, markers) => {

    const userList = this.state.users;
    const markerList = userList.map(user =>{
        
        return {latitude: user.position.latitude, longitude: user.position.longitude, username: user.username, perc: this.getRandomNumber() };
    });

    return markerList;

  }

  onListenForUsers() {    

   

    this.setState({ loading: true });
    this.props.firebase.users().on('value', snapshot => {
      
      const userObject = snapshot.val();

      if (userObject) {
          //convert user list from snapshot
          const userList = Object.keys(userObject).map(key => ({
            ...userObject[key],
            uid: key,
          }));

          this.setState({ users: userList, loading: false});
      } else {
        this.setState({ users: null, loading: false })
      }
    });
    
  }
  

  getUserPositionFromDB = () => {
    
    this.props.firebase
      .user(this.props.userId)
      .child("position")
      .once("value", snapshot => {
        const userPosition = snapshot.val();
        console.log(JSON.parse(JSON.stringify(userPosition)));
        this.setState({ dbCoords: userPosition });
      });
  };

  writeUserPositionToDB = position => {
    const { latitude, longitude } = position;

    this.props.firebase
      .user(this.props.userId)
      .update({ position: { latitude: latitude, longitude: longitude } });
    //this.setState({ dbCoords: position });
    this.getUserPositionFromDB();
  };

  componentDidMount() {
 

    this.onListenForUsers();    

    this.getUserPositionFromDB();
    this.watchId = navigator.geolocation.watchPosition(
      this.updatePosition,
      error => {
        console.log("error" + error);
      },
      {
        enableHighAccuracy: true,
        timeout: 2000,
        maximumAge: 0,
        distanceFilter: 1
      }
    );
  }
  componentWillUnmount() {
    this.props.firebase.users().off();
    
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {
    //console.log('logga: ' + JSON.stringify(this.state.users));
    console.log('logga:  ' + JSON.stringify(this.makeMarkers()))
    const markers = this.makeMarkers();
    
    return (
      <div>
      {/* <UserList users={this.state.users} /> */}
        {this.state.browserCoords ? (
          <MyMap perc={this.state.perc}
            markers={markers}
            position={Object.values(this.state.browserCoords)}
            zoom={13}
          />
        ) : null}
         {/*<div>Geolocation</div>
        <div>
          <p>Coords from Browser</p>
          <Coords position={this.state.browserCoords} />
          <p>Coords from DB</p>
          <Coords position={this.state.dbCoords} />
        </div>         */}
      </div>
    );
    
  }
}

const UserList = ({ users }) => (
  
    <ul>
    
      {users.map(user => (
        <UserItem 
          key={user.uid} 
          username={user.username} 
          longitude={user.position.longitude}
          latitude={user.position.latitude}
        />
      ))}
    </ul>
  );

const UserItem = (props) => (
    <div>
        {props.username}, longitude {props.longitude} : latitude {props.latitude}
    </div>
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

const MyMap = props => {
  
  return (
  <Map
    zoomControl={false}
    scrollWheelZoom={false}
    
    zoom={props.zoom}
    center={[59.312175,18.073377900000004]}
    
    onClick={props.onMapClick}
  >
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
    />
    {props.markers.map((marker,index) => {
        //const L = require('leaflet');
        const customMarker = L.divIcon({ html: ReactDOMServer.renderToString(<Icon perc={marker.perc}/>), className: 'custom icon'})
        return(
      <Marker key={index} icon={customMarker}   position={[marker.latitude, marker.longitude]}>
        <Popup >
          {marker.username}
        </Popup>
      </Marker>
      )
    })}
  </Map>
);
  }
export default withFirebase(LocatedTwo);

export { MyMap };
