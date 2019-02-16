import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import GoogleMaps from '../Maps'

import MenuLog from './style'
import SignInPage from '../SignIn/index'

import { AuthUserContext } from '../Session';


const Navigation = () => (

    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>

);

const NavigationAuth = () => (

  <ul>
    <li>
      <Link to={ROUTES.MAP}>Map</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    <li>
      <Link to={ROUTES.ADMIN}>Admin</Link>
    </li>
    <li>
      <SignOutButton />
    </li>

  </ul>


);

const NavigationNonAuth = () => (
  // <SignInPage></SignInPage>
  <MenuLog>
  <ul>
    <li>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
  </MenuLog>
);

export default Navigation;
