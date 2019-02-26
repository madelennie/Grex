import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import { AuthUserContext } from '../Session';



class Navigation extends Component {
  
 
  render () {


    return (
       <div>      
        <AuthUserContext.Consumer>
          {authUser => { 
            if (authUser) {
              if (authUser.roles.includes(ROLES.ADMIN)){
                this.props.loggedIn(this, authUser ? true : false)  
              } 
            }
            
            return authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />
          }}
        </AuthUserContext.Consumer>
        </div>
    );
  }
} 



const NavigationAuth = ({ authUser }) => (

  <ul>
    {/* <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.MAP}>Map</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>AccountX</Link>
    </li> */}
{/*     
    {authUser.roles.includes(ROLES.ADMIN) && (
    <li>
    <Link to={ROUTES.ADMIN}>Admin</Link>
    </li>   
    )}
    {authUser.roles.includes(ROLES.ADMIN) && (    
    <li>
    <Link to={ROUTES.EVENT}>Events</Link>
    </li>
    )}
    <li>
      <SignOutButton />
    </li> */}
  </ul>
  
);

const NavigationNonAuth = () => (

  <ul>
    
    {/* <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li> */}
  </ul>
);

export default Navigation;
