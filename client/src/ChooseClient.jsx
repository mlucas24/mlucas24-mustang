import React from "react";
import axios from "axios";
import Client from "./Client.jsx";

//const URL = 'http://localhost:8080';
 const URL = 'https://mustang-node-qb3jp3n5oa-ue.a.run.app';
class ChooseClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      clientFirstName: "",
      clientLastName: "",
      clients: [],
      clientSelect: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleClick(clientLastName, clientFirstName, email) {
    this.setState(
      {
        clientLastName: clientLastName,
        clientFirstName: clientFirstName,
        email: email
      },
      () =>
        this.props.changeClient(
          this.state.clientFirstName,
          this.state.clientLastName,
          this.state.email
        )
    );
  }

  handleSubmit(event) {
    let worked = true;
    for (let i = 0; i < this.state.clients.length; i++) {
      if (
        this.state.clients[i][2].toLowerCase() ===
        this.state.email.toLowerCase()
      ) {
        worked = false;
        alert("Uh Oh! This person has already been created!");
      }
    }
    if (worked) {
      axios
        .post(
          `${URL}/newClient/${this.state.clientFirstName}/${this.state.clientLastName}/${this.state.email}/${this.props.uid}`
        )
        .then(() =>
          this.props.changeClient(
            this.state.clientFirstName,
            this.state.clientLastName,
            this.state.email
          )
        );
      event.preventDefault();
    }
  }

  componentDidMount() {
    //get all the clients that already exist in the database
    axios.get(`${URL}/findClients/`).then(clients => {
      let clientArray = [];
      for (let i = 0; i < clients.data.length; i++) {
        if (clients.data[i].uid === this.props.uid) {

          clientArray.push([
            clients.data[i].firstName,
            clients.data[i].lastName,
            clients.data[i].email
          ]);
        }
        }
      this.setState({
        clients: clientArray
      });
    });
  }

  render() {
    return (
      <div id="maindiv-ChooseClient">
        <div>Make a new client:</div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="clientFirstName"
            placeholder="Client First Name"
            value={this.state.clientFirstname}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="clientLastName"
            placeholder="Client Last Name"
            value={this.state.clientLastName}
            onChange={this.handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <button onClick={() => this.handleSubmit}>Submit</button>
        </form>
        <div>select an existing client: </div>
        <table className="clientTable">
          <thead className="clientTable">
            <tr onClick={() => this.handleClick}>
              <td className="clientTable">Last Name</td>
              <td className="clientTable">First Name</td>
              <td className="clientTable">Email</td>
            </tr>
          </thead>
          <tbody>
            {this.state.clients.map((client, key) => (
              <Client client={client} key={key} handleClick={this.handleClick} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ChooseClient;
