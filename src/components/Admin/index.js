//Import Libraries
import React, { Component } from "react";
import { Switch,withRouter, Route, Link } from "react-router-dom";

import { compose } from "recompose";

import { ReactLeafletSearch } from 'react-leaflet-search'
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

//Import components
import { withFirebase } from "../Firebase";
import { withAuthorization,AuthUserContext, withEmailVerification } from "../Session";
import {SVGIconComponent} from './iconComponent'
import ReactDOMServer from 'react-dom/server';


import { LocationMap } from "../Maps";
import L from "leaflet";

//Import from constant folder
import * as ROLES from "../../constants/roles";
import * as ROUTES from "../../constants/routes";


const AdminPage = (props) => (
  <div>
    <h1>Admin</h1>
    <p>The Admin page is accessible by every signed in admin user.</p>

    <Switch>
      <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
      <Route exact path={ROUTES.ADMIN} component={UserList} />
    </Switch>

    <div>
      <Events icon={props.LocationIcon} handleClick={props.handleClick}></Events>
    </div>

  </div>

);

class UserListBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],

    };

  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on("value", snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,

      }));

      this.setState({
        users: usersList,
        loading: false
      });
    });
  }


  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;

    // const position = [this.state.lat, this.state.lng]

    return (

      <div>
        <h2>User</h2>
        {loading && <div>Loading ...</div>}
        <ul>
          {users.map(user => (
            <li key={user.uid}  >

              <span>
                <strong>ID:</strong> {user.uid}
              </span>
              <span>
                <strong>E-Mail:</strong> {user.email}
              </span>
              <span>
                <strong>Username:</strong> {user.username}
              </span>
              <br></br>
              {/* <span>
                <strong>Position</strong> {user.position.lat} {user.position.lng}
                <br></br>
              </span> */}
              <span>
                <Link
                  to={{
                    pathname: `${ROUTES.ADMIN}/${user.uid}`,
                    state: { user }
                  }}
                >
                  Details
                </Link>
              </span>
            </li>
          ))}
        </ul>
      </div>
    )
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
    if(this.state.user) {
      return;
    }
    this.setState({ loading: true });

    this.props.firebase
      .user(this.props.match.params.id)
      .on("value", snapshot => {
        this.setState({
          user: snapshot.val(),
          loading: false
        });
      });
  }

  componentWillMount() {
    this.props.firebase.user(this.props.match.params.id).off();
  }
  onSendPasswordResetEmail = () => {
    this.props.firebase.doPasswordReset(this.state.user.email)
  }
  render() {
    const { user, loading } = this.state;

    return (
      <div>
        <h2> User ({this.props.match.params.id})</h2>
        {loading && <div>Loading...</div>}

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

  withAuthorization(condition)
)(AdminPage);




class StartEvent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name:'',
      loading: false,
      events: [],
      latitude: '',
      longitude: ''
    }

  }
  componentDidMount() {
    this.setState({loading:true})

    this.props.firebase.events().on('value', snapshot => {
      const eventObject = snapshot.val()

      if (eventObject) {
        const eventList = Object.keys(eventObject).map(key => ({
          ...eventObject[key],
          uid:key,
        }))
        // console.log('eventObject',eventObject)
        //Convert event list from snapshot..do i really want a list though?
        this.setState({
          events: eventList,
          loading:false,

        })
      } else {
        this.setState({events:null, loading:false})
      }
    })
  }
  // componentWillMount () {
  //   this.props.firebase.events().off
  //   }
  onChangeText = event => {

    this.setState({ [event.target.name]: event.target.value })
  }

   handleClick = event => {
    const { lat, lng } = event.latlng
    
    console.log(`Clicked at -> ${lat}, ${lng}`)
    this.setState({  latitude: lat, longitude: lng });

  }

  onCreateEvent =(event, authUser,events)  => {
    console.log('eventlist', this.state.events)
    this.props.firebase.events().push({
      name:this.state.name,
      userId:authUser.uid,
      latitude:this.state.latitude,
      longitude:this.state.longitude,

    })
    this.setState({name: ''})


    event.preventDefault()
  }

      inviteEvent = (event,authUser) => {
        const eventKey = this.props.firebase.user(this.state.authUser.uid).push().key;
    
        this.props.firebase
            .user(this.state.authUser.uid)
            .child(eventKey)
            .set({
              invEvent: this.state.events
            });

   }
   

  render() {



    const {name, events, loading} = this.state

  return (

       <AuthUserContext.Consumer>
        {authUser => (
          <div>

          />
          <h2>Event</h2>
          {loading && <div> Loading... </div>}
          <LocationMap userId={authUser.uid}

  firebase={this.props.firebase} handleClick={this.handleClick} />
          {events ? (
            <EventList events={events} />
    
          ) : (
              <div> There no active events</div>
          )}

          <form onSubmit={event => this.onCreateEvent(event,authUser)}>
              <input
              type="text"
              name="name"
              value={name}
              onChange={this.onChangeText}
              />
              <button type="submit">Create Event</button>
          </form>
          <form onSubmit={event => this.inviteEvent(event)}>

              <button type="submit">Send invite Event</button>
          </form>

        </div>
        )}
        </AuthUserContext.Consumer>

  )
  }
}
const EventList = ({events}) => (
  <ul>
    {events.map(event => (
      <EventItem key={event.uid} event={event} />
    ))}
  </ul>
)
// const EventForm = compose(withRouter, withFirebase,)(StartEvent);

const EventItem = ({event}) => (
  <li>
    <strong>{event.name}</strong> <br />
    <strong>Latitude  : {event.latitude}</strong> <br />
    <strong>Longitude : {event.longitude}</strong>
  </li>
)

const Events = withFirebase(StartEvent)

