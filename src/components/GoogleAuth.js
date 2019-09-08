import React, { Component } from 'react';
//redux
import { signIn, signOut } from '../actions';
import { connect } from 'react-redux';

class GoogleAuth extends Component {
    componentDidMount() {
        const clientId = '363677695215-5t7a8g7gfpgua5cv37ckofr930e96mu5.apps.googleusercontent.com'
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId,
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                //get reference to auth object
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
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

    onAuthChange = isSignedIn => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);