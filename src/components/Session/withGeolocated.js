import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import {geolocated} from 'react-geolocated';

//HOC lets geolocated gets access to Firebase and authenticated user

const withGeolocated = Component => {
    class WithGeolocated extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                isLocated: false,
            }
        }

        render() {
            return (
                <AuthUserContext.Consumer>
                    {
                    authUser => 
                        !this.state.isLocated ? (
                        <div></div>
                    ) : (
                        <div>test</div>
                    )}
                    

                </AuthUserContext.Consumer>
            );
        }
    }
        return withFirebase(WithGeolocated);
};




export default withGeolocated;


