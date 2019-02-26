import React, { Component } from 'react';
import {  BrowserRouter as Router, Route } from 'react-router-dom';


import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import MapPage from '../MapPage';
import EventPage from '../Event';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import { AuthUserContext } from '../Session';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;  
  background-color: black;  
  min-height: 100vh;  
  align-items: center; 
  width: '100%';
`;

const Item = styled.div`
  
  margin: auto;
  background-color: white;
  border: 1px solid #000;
  border-radius: 25px;
  padding: 20px;
  width: ${props => props.animWidth || '30%'};
  height: ${props => props.animHeight || '30%'};  
`;

class App extends Component {
  state = {
    loggedIn : false,
    animWidth: false,
    animHeight: false,
  }
  isLoggedIn = (e, loggedIn) => {
    
    if (loggedIn){  
      if (!this.state.loggedIn) {
        this.setState({ loggedIn: true });
        this.setState({animWidth: '90%'})
        this.setState({animHeight: '90%'})
      }     
      
    }
    else{
      if (this.state.loggedIn) {
        this.setState({ loggedIn: false });
        this.setState({animWidth: '30%'})
        this.setState({animHeight: '30%'})
      } 
      
    }
  }

  
  render () {
    
    return (  
      <Router>  
      <Container>  
          <Item animWidth={this.state.animWidth}>         
            <Navigation loggedIn={this.isLoggedIn} />
            
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route
              exact
              path={ROUTES.PASSWORD_FORGET}
              component={PasswordForgetPage}
            />
            <Route exact path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.MAP} component={MapPage} />
            <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route exact path={ROUTES.ADMIN} component={AdminPage} />
            <Route exact path={ROUTES.EVENT} component={EventPage} />  
          </Item>
      </Container>                  
      </Router>
  
    );
  }
}


export default withAuthentication(App);
