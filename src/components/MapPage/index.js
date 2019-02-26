import React, { Component } from "react";
import { compose } from "recompose";

import { AuthUserContext, withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
//import Located from "../Geolocated";
import LocatedTwo from "../Geolocated";

class MapPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Map</h1>
        <AuthUserContext.Consumer>
          {authUser => (
            <LocatedTwo userId={authUser.uid} />
          )}
        </AuthUserContext.Consumer>
      </div>
    );
  }
}


const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withAuthorization(condition)
)(MapPage);
