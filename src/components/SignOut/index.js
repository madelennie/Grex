import React from 'react';


import { withFirebase } from '../Firebase';
import { defaultProps } from 'recompose';

const SignOutButton = ({ firebase }) => (
  <div>
  <button type="button" onClick={firebase.doSignOut}>
    Inactive / Sign out
  </button>  
  </div>
);

export default withFirebase(SignOutButton);
