import React, { Component } from "react";
import { compose } from "recompose";

import { AuthUserContext, withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import LocatedTwo from './index';

class MapPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
          users: null
        };
      }
render() {
    return (
        <AuthUserContext.Consumer>
                {authUser => (
                <LocatedTwo userId={authUser.uid} firebase={this.props.firebase} />
                )}
        </AuthUserContext.Consumer>
    )}
}

const condition = authUser => !!authUser;
export default compose(
  withFirebase,
  withAuthorization(condition)
)(MapPage);

