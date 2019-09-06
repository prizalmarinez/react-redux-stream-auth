import React, { Component } from 'react';

class GoogleAuth extends Component {
    state = {
        signedIn: null
    }

    componentDidMount() {
        const clientId = '363677695215-5t7a8g7gfpgua5cv37ckofr930e96mu5.apps.googleusercontent.com'
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId,
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                //get reference to auth object
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return null;
        } else if (this.state.isSignedIn) {
            return (
                <button className="ui red button google" onClick={() => this.auth.signOut()}>
                    <i className="google icon" /> Sign Out
                </button>
            )
        }
        else {
            return (
                <button className="ui red button google" onClick={() => this.auth.signIn()}>
                    <i className="google icon" /> Sign in with Google
                </button>
            )
        }
    }

    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get() })
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );
    }
}

export default GoogleAuth;