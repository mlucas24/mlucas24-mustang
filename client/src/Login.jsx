import React from "react";
import axios from "axios";
import {auth, googleAuthProvider} from './firebase.js';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
    };
  }

  componentDidMount = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.checkLogin(user.displayName, user.uid, user.photoURL);
    }
    })
  }

  render() {
    return (
      <div>
      <h1>Welcome to Mustang!</h1>
      <h3>A financial adviser-facing web application to run improved Monte Carlo Simulations</h3>
      <div>to begin, Sign Up/Login with Google.</div>
      <div className="SignIn">
        <img src="https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png" onClick={() => auth.signInWithPopup(googleAuthProvider)} />
      </div>
      </div>
    );
  };
}

export default Login;
