import React from "react";
import axios from "axios";
import DashBoard from "./DashBoard.jsx";

// const URL = 'http://localhost:8080';
 const URL = 'https://mustang-node-qb3jp3n5oa-ue.a.run.app';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email,
      age: this.props.age,
      savings: this.props.savings,
      RothIRA: this.props.RothIRA,
      IRA: this.props.IRA,
      Traditional401K: this.props.Traditional401K,
      Traditional: this.props.Traditional,
      AnnualBudget: this.props.AnnualBudget,
      AnnualPensions: this.props.AnnualPensions,
      SocialSecurityAge: this.props.SocialSecurityAge,
      SocialSecurity: this.props.SocialSecurity,
      otherIncome: this.props.otherIncome,
      totalDebts: this.props.totalDebts,
      status: this.props.status,
      loading: false
    };
  }
  componentDidMount() {
    axios
      .patch(`${URL}/mustangRun`, {
        params: {
          email: this.state.email,
          age: this.state.age,
          savings: this.state.savings,
          RothIRA: this.state.RothIRA,
          IRA: this.state.IRA,
          Traditional401K: this.state.Traditional401K,
          Traditional: this.state.Traditional,
          AnnualBudget: this.state.AnnualBudget,
          AnnualPensions: this.state.AnnualPensions,
          SocialSecurityAge: this.state.SocialSecurityAge,
          SocialSecurity: this.state.SocialSecurity,
          otherIncome: this.state.otherIncome,
          totalDebts: this.state.totalDebts,
          status: this.state.status
        }
      })
      .then(response =>
        this.setState({
          loading: true
        })
      );
  }

  render() {
    return (
      <div>
        {!this.state.loading ? (
          <div>hello I am loading</div>
        ) : (
          <DashBoard
            email={this.state.email}
            clientFirstName={this.state.firstName}
            clientLastName={this.state.lastName}
            age={this.state.age}
            savings={this.state.savings}
            RothIRA={this.state.RothIRA}
            IRA={this.state.IRA}
            Traditional401K={this.state.Traditional401K}
            Traditional={this.state.Traditional}
            AnnualBudget={this.state.AnnualBudget}
            AnnualPensions={this.state.AnnualPensions}
            SocialSecurityAge={this.state.SocialSecurityAge}
            SocialSecurity={this.state.SocialSecurity}
            otherIncome={this.state.otherIncome}
            totalDebts={this.state.totalDebts}
            status={this.state.status}
            simulation={true}
            removeClient={this.props.removeClient}
          />
        )}
      </div>
    );
  }
}

export default App;
