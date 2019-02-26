import React, { Component } from 'react';

import { compose } from 'recompose';
import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';
import { withFirebase } from '../Firebase';

import LocatedTwo from '../Geolocated';
import StatusPage from '../StatusPage';
import SignOutButton from '../SignOut';
import * as ROLES from '../../constants/roles';




class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    users: null,
    latitude: null,
    longitude: null,
    };
   
  }
  componentDidMount(){
    //alert('home')
    this.props.firebase.users().on('value', snapshot => {
      this.setState({
        users: snapshot.val(),
      })
    })    
  }
  componentWillUnmount(){
    this.props.firebase.users().off();
  }
  
  render() {
    return (
      <AuthUserContext.Consumer>
    {authUser => (
     <div>
      {authUser.roles.includes(ROLES.ADMIN) && (
        <div>
        <LocatedTwo userId={authUser.uid} />
        <SignOutButton />  
        </div>
        )}
        {!authUser.roles.includes(ROLES.ADMIN) && (
        <div>
        <StatusPage /> 
        </div>
        )}
      
      {/* <Messages users={this.state.users} /> */}
      </div>
     
    )}
  </AuthUserContext.Consumer>
    
    );
    }
  }

class MessagesBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      loading: false,
      messages: [],
      limit: 5,
    };
  }
  componentDidMount() {
    this.onListenForMessages();
  }
  onListenForMessages(){
    this.setState({ loading: true });

    this.props.firebase.messages().orderByChild('createdAt').limitToLast(this.state.limit).on('value', snapshot => {
      
      const messageObject = snapshot.val();

      if (messageObject) {
          //convert messages list from snapshot
          const messageList = Object.keys(messageObject).map(key => ({
            ...messageObject[key],
            uid: key,
          }));

          this.setState({ messages: messageList, loading: false});
      } else {
        this.setState({ messages: null, loading: false })
      }
    });
  }

  componentWillUnmount() {
    this.props.firebase.messages().off();
  }

  onChangeText = event => {
    this.setState({ text: event.target.value });
  }

  onCreateMessage = (event, authUser) => {
    this.props.firebase.messages().push({
      text: this.state.text,
      userId: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({ text: '' });

    event.preventDefault();
  }

  onRemoveMessage = uid => {
    this.props.firebase.message(uid).remove();
  }
  onEditMessage = (message, text) => {
    this.props.firebase.message(message.uid).set({
      ...message,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    })
  }

  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),
      this.onListenForMessages,
    );
  }

  render() {
    const { users } = this.props;
    const { text, messages, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
      <div>
        {
          !loading && messages && (
            <button type="button" onClick={this.onNextPage}>
              More
            </button>
          )
        }
        {loading && <div>Loading ...</div>}

        {messages ? (
          <MessageList 
            messages={messages.map(message => ({
              ...message,
              user: users 
                ? users[message.userId]                
                : { userId: message.userId },
            }))} 
            onRemoveMessage={this.onRemoveMessage}
            onEditMessage={this.onEditMessage}
          /> 
        ) : (
          <div>There are no messages ...</div>&& console.log('finns ej')
        )}  

        <form onSubmit={event => this.onCreateMessage(event, authUser)}>
          <input
            type="text"
            value={text}
            onChange={this.onChangeText}
          />  
          <button type="submit">Send</button>
        </form>      
      </div>
      )}
      </AuthUserContext.Consumer>
    );
  }
}

const MessageList = ({ messages, onRemoveMessage, onEditMessage }) => (
  
  <ul>
  
    {messages.map(message => (
      <MessageItem 
        key={message.uid} 
        message={message} 
        onRemoveMessage={onRemoveMessage}
        onEditMessage={onEditMessage}
      />
    ))}
  </ul>
);

class MessageItem extends Component {
  constructor(props){
    super(props);

    this.state = {
      editMode: false,
      editText: this.props.message.text,
    };
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.message.text,
    }));
  }
  onChangeEditText = event => {
    this.setState({ editText: event.target.value });
  }
  onSaveEditText = () => {
    this.props.onEditMessage(this.props.message, this.state.editText);

    this.setState({ editMode: false });
  }

  render () {
    const { message, onRemoveMessage } = this.props;
    const { editMode, editText } = this.state;

    return (
      <li>
        {editMode ? (
          <input
            type="text"
            value={editText}
            onChange={this.onChangeEditText}
          />
        ) : (
          <span>
            <strong>
              {message.user.username || message.user.userId}
            </strong> 
            {message.text} {message.editedAt && <span>(Edited)</span>}
          </span>
        )}
        {editMode ? (
          <span>
            <button onClick={this.onSaveEditText}>Save</button>
            <button onClick={this.onToggleEditMode}>Reset</button>
          </span>
        )
        :
        (
          <button onClick={this.onToggleEditMode}>Edit</button>
        )
        }
        {!editMode && (
          <button 
            type="button"
            onClick={() => onRemoveMessage(message.uid)}
          >
          Delete
          </button>
        )}
      </li>
    )
  }
}

const Messages = withFirebase(MessagesBase);

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withEmailVerification,
  withAuthorization(condition),
  )(HomePage);
