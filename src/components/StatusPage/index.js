import React from 'react';
import SignOutButton from '../SignOut';

const StatusPage = () => (
  <div>
    <button>Staying home</button><br />
    <button>On my way</button><br />
    <button>Arrived</button><br />
<SignOutButton >Inactivate / Log out</SignOutButton>
  </div>
);

export default StatusPage;
