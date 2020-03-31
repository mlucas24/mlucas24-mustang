import React from "react";
import Login from "./Login.jsx";
import Home from "./Home.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      displayName: "",
      photoURL: "",
      uid: ""
    };
    this.checkLogin = this.checkLogin.bind(this);
  }

  checkLogin(displayName, uid, photoURL) {
    this.setState({
      displayName, uid, photoURL,
      logged: true
    });
  }

  componentDidMount() {}
  render() {
    return (
      <div id="main-all">
        {!this.state.logged ? (
          <Login checkLogin={this.checkLogin} />
        ) : (
          <Home
            displayName={this.state.displayName} uid={this.state.uid} photoURL={this.state.photoURL}
          />
        )}
      </div>
    );
  }
}

export default App;
