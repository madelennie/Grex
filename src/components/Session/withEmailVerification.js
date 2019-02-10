import React, { Component } from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withEmailVerification = Component => {
    class withEmailVerification extends React.Component {
        constructor(props) {
            super(props)

            this.state = { isSent : false}
        }
        onSendEmailVerification = () => {
            this.props.firebase.doSendEmailVerification()
            .then(() => this.setState ({isSent : true}))
        }
        render() {
            return (
                <AuthUserContext.Consumer>
                    {authUSer =>
                    needsEmailVerification(authUSer) ? (
                        <div>
                            {this.state.isSent ? (
                           <p>
                            E-Mail confirmation sent: Check you E-Mails (Spam
                            folder included) for a confirmation E-Mail.
                            Refresh this page once you confirmed your E-Mail.
                            </p>
                            ) : (
                            <p>
                            Verify your E-Mail: Check you E-Mails (Spam folder
                            included) for a confirmation E-Mail or send
                            another confirmation E-Mail.
                            </p>
                            )}
                            <button
                               type="button"
                               onClick={this.onSendEmailVerification}
                               disabled = {this.state.isSent}
                            >
                            Send confirmation E-mail
                            </button>
                        </div>
                    ) : (
                         <Component {...this.props} />
                        )
                    }
                </AuthUserContext.Consumer>
            )
        }
    }

    return withFirebase(withEmailVerification)
}

const needsEmailVerification = authUser =>
    authUser &&
    !authUser.emailVerified &&
    authUser.providerData
        .map(provider => provider.providerId)
        .includes('password')

export default withEmailVerification