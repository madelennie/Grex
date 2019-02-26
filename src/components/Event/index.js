import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import { compose } from 'recompose';
import DateTimePicker from 'react-datetime-picker';

import { withFirebase } from '../Firebase';
import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

import { MyMap } from '../Geolocated';


const EventPage = () => (
  <div>
  <h1>Events</h1>
  <p>The Event Page is accessible by every signed in admin user.</p>
  <Switch>
  <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
  <Route exact path={ROUTES.EVENT} component={UserList} />
  </Switch>
  </div>
  );

  class UserListBase extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        users: [],        
        event_name:'',
        event_latitude: '',
        event_longitude: '',        
        event_participant_list_id: [],
        marker: [],
        event_datetime: '',

      };
    }
    componentDidMount() {
      this.setState({ loading: true });
      this.props.firebase.users().on('value', snapshot => {
        const usersObject = snapshot.val();
        
        const usersList = Object.keys(usersObject).map(key => ({
          ...usersObject[key],
          uid: key,
        }));

        this.setState({
        users: usersList,
        loading: false,
        });
      });
    }
    componentWillUnmount() {
      this.props.firebase.users().off();
    }
    onChangeText = event => {
        this.setState({ [event.target.name]: event.target.value });
      }
    
    onCreateEvent = (event, authUser) => {
        event.preventDefault();
        console.log('datum' + this.state.event_datetime)
        this.props.firebase.events().push({            
            event_name: this.state.event_name,
            event_latitude: this.state.event_latitude,
            event_longitude: this.state.event_longitude,
            event_datetime: this.state.event_datetime, //'Wed Feb 20 2019 14:45:13 GMT+0100 (centraleuropeisk normaltid)',            
            event_participant_list_id: this.state.users,
            userId: authUser.uid,
            createdAt: this.props.firebase.serverValue.TIMESTAMP,
        });   
         
        this.setState({             
            event_name:'',
            event_latitude: '',
            event_longitude: '',
            event_datetime: '',
            event_participant_list_id: [],
         });    
        
    }
    onMapClick = (event) => {
      console.log('koordinater: ' + event.latlng);
      const latitude = event.latlng.lat;
      const longitude = event.latlng.lng;
      this.state.marker=[];
      const marker = this.state.marker;
      marker.push({latitude: latitude, longitude: longitude});
      this.setState({event_latitude: latitude, event_longitude: longitude, marker: marker});
    }
    onChangeDateTime = date => this.setState({ date })

    // makeMarker = (users, markers) => {

    //   const userList = this.state.users;
    //   const markerList = userList.map(user =>{
          
    //       return {latitude: user.position.latitude, longitude: user.position.longitude, username: user.username, perc: this.getRandomNumber() };
    //   });
  
    //   return markerList;
  
    // }

    render() {
      const { users, loading, event_name, event_latitude, event_longitude, event_datetime, event_participant_list_id } = this.state;
      
      return (
          <AuthUserContext.Consumer>
          {authUser => (
            <form onSubmit={event => this.onCreateEvent(event, authUser)}>
          <input
            name="event_name"
            type="text"
            value={event_name}
            onChange={this.onChangeText}
            placeholder='Event name'
          />
          <input
            name="event_longitude"
            type="text"
            value={event_longitude}
            onChange={this.onChangeText}
            placeholder='Longitude'
          />
          <input
            name="event_latitude"
            type="text"
            value={event_latitude}
            onChange={this.onChangeText}
            placeholder='Latitude'
          />
          <input
            name="event_datetime"
            type="text"
            value={event_datetime}
            onChange={this.onChangeText}
            placeholder='Time'
          />
          <input
            name="event_participant_list_id"
            type="text"
            value={event_participant_list_id}
            onChange={this.onChangeText}
            placeholder='List of Participants'
          />

          
          
          <button type="submit">Send</button>
            {console.log(this.state.marker)}
          <div>
          <DateTimePicker
            onChange={this.onChangeDateTime}
            value={this.state.event_datetime}
          />
            Klick on map to select location for event
          <MyMap perc={'10'}
            markers={this.state.marker}
            position={[80,100]}
            zoom={13}
            onMapClick={(event) => this.onMapClick(event)}
          />
        
        <h2>List of events</h2>
        {loading && <div>Loading ...</div>}
          <ul>
           {users.map(user => (
              <li key={user.uid}>
                <span>
                  <strong>ID:</strong> {user.uid}
                </span>
                Admin Dashboard 143
                <span>
                   <strong>E-Mail:</strong> {user.email}
                </span>
                <span>
                  <strong>Username:</strong> {user.username}
                </span>
                <span>
                  <Link to={{
                  pathname: `${ROUTES.ADMIN}/${user.uid}`,
                  state: { user },
                  }}>
                  Details
                  </Link>
                </span>
              </li>
            ))}
          </ul>
      </div>
        </form>   
        )}
        </AuthUserContext.Consumer>
      );   
    }
}

class UserItemBase extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        user: null,
        ...props.location.state,
      };
    }
    componentDidMount() {
      if (this.state.user) {
        return;
      }
      this.setState({ loading: true });
      this.props.firebase
      .user(this.props.match.params.id)
      .on('value', snapshot => {
        this.setState({
          user: snapshot.val(),
          loading: false,
        });
      });
    }
    componentWillUnmount() {
      this.props.firebase.user(this.props.match.params.id).off();
    }

    onSendPasswordResetEmail = () => {
      this.props.firebase.doPasswordReset(this.state.user.email);
    }
    
    render() {
      const { user, loading } = this.state;
        return (
          <div>
            <h2>User ({this.props.match.params.id})</h2>
            {loading && <div>Loading ...</div>}
            {user && (
            <div>
              <span>
                <strong>ID:</strong> {user.uid}
              </span>
              <span>
                <strong>E-Mail:</strong> {user.email}
              </span>
              <span>
                <strong>Username:</strong> {user.username}
              
              </span>
              <span>
                <button
                type="button"
                onClick={this.onSendPasswordResetEmail}
                >
                  Send Password Reset
                </button>
              </span>
            </div>
          )}
          </div>
      );
    }
  }



const condition = authUser => authUser && authUser.roles.includes(ROLES.ADMIN);

const UserList = withFirebase(UserListBase);
const UserItem = withFirebase(UserItemBase);

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase,
  )(EventPage);
