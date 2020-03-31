import React from "react";
import ChooseClient from "./ChooseClient.jsx";
import DashBoard from "./DashBoard.jsx";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: false,
      clientFirstName: "",
      clientLastName: "",
      email: ""
    };
    this.changeClient = this.changeClient.bind(this);
    this.removeClient = this.removeClient.bind(this);
  }

  removeClient () {
    this.setState ({client: false});
  }

  changeClient(clientFirstName, clientLastName, email) {
    this.setState(
      {
        clientFirstName: clientFirstName,
        clientLastName: clientLastName,
        email: email
      },
      () =>
        this.setState({
          client: true
        })
    );
  }
  componentDidMount() {}

  render() {
    return (
      <div id="main-home">
        {!this.state.client ? (
          <div>
            <div className="welcome">
             <img className="avatar" src={this.props.photoURL} /> Welcome to Mustang {this.props.displayName}!
            </div>
            <ChooseClient changeClient={this.changeClient} uid={this.props.uid} />{" "}
          </div>
        ) : (
          <DashBoard
            clientFirstName={this.state.clientFirstName}
            clientLastName={this.state.clientLastName}
            email={this.state.email}
            firstName={this.props.firstName}
            lastName={this.props.lastName}
            uid={this.props.uid}
            removeClient={this.removeClient}
          />
        )}
      </div>
    );
  }
}

export default Home;
