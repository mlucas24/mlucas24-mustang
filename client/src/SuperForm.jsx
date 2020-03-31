import React from "react";
import Loading from "./Loading.jsx";

class SuperForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isButtonPressed: 1,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email,
      age: this.props.age || 60,
      savings: this.props.savings || 0,
      RothIRA: this.props.RothIRA || 0,
      IRA: this.props.IRA || 0,
      Traditional401K: this.props.Traditional401K || 0,
      Traditional: this.props.Traditional || 0,
      AnnualBudget: this.props.AnnualBudget || 0,
      AnnualPensions: this.props.AnnualPensions || 0,
      SocialSecurityAge: this.props.SocialSecurityAge || 62,
      SocialSecurity: this.props.SocialSecurity || 30000,
      otherIncome: this.props.otherIncome || 0,
      totalDebts: this.props.totalDebts || 0,
      status: this.props.status || "single"
    };
    this.buttonPress = this.buttonPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }
  buttonPress() {
    const newVal = this.state.isButtonPressed + 1;
    this.setState({
      isButtonPressed: newVal
    });
  }

  handleSubmit(event) {
    this.buttonPress();
    event.preventDefault();
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleOptionChange(event) {
    this.setState({
      status: event.target.value
    });
  }

  render() {
    return (
      <div>
        {this.state.isButtonPressed === 1 ? (
          <div>
            <div>{this.state.firstName}, are you ready to get started?</div>
            <button onClick={this.props.removeClient}>No, choose different client</button>
            <div>it may be helpful to obtain these documents: </div>
            <ul>
              <li>your bank statements</li>
              <li>your retirement and other investment account statements</li>
              <li>Pension and Annuity account documents</li>
              <li>
                Your social security income and the age you will start receiving
                it
              </li>
              <li>A copy of your credit report</li>
              <li>A working budget for comfortable living within your means</li>
            </ul>
            <button onClick={() => this.buttonPress()}>lets go!</button>
          </div>
        ) : this.state.isButtonPressed === 2 ? (
          <div>
            <div>Let's get started!</div>
            <form onSubmit={this.handleSubmit}>
              <div>
              <label>
                How old are you?
                <input
                  type="number"
                  name="age"
                  placeholder="age"
                  min="60"
                  max="95"
                  value={this.state.age}
                  onChange={this.handleChange}
                  required
                />
              </label>
              </div>
              <div>
              <label>
                What age will you start taking social security?
                <input
                  type="number"
                  name="SocialSecurityAge"
                  placeholder="Social Security pullout age"
                  value={this.state.SocialSecurityAge}
                  onChange={this.handleChange}
                />
              </label>
              </div>
              <hr/>
              <div>How much have you saved for retirement?</div>
              <div>
              <label>
                Savings
                <input
                  type="number"
                  name="savings"
                  placeholder="savings"
                  value={this.state.savings}
                  onChange={this.handleChange}
                />
              </label>
              </div>
              <div>
              <label>
                Roth IRA
                <input
                  type="number"
                  name="RothIRA"
                  placeholder="RothIRA"
                  value={this.state.RothIRA}
                  onChange={this.handleChange}
                />
              </label>
              </div>
              <div>
              <label>
                IRA
                <input
                  type="number"
                  name="IRA"
                  placeholder="IRA"
                  value={this.state.IRA}
                  onChange={this.handleChange}
                />
              </label>
              </div>
              <div>
              <label>
                401(K)
                <input
                  type="number"
                  name="Traditional401K"
                  placeholder="Traditional401K"
                  value={this.state.Traditional401K}
                  onChange={this.handleChange}
                />
              </label>
              </div>
              <div>
              <label>
                Traditional Accounts
                <input
                  type="number"
                  name="Traditional"
                  placeholder="Traditional"
                  value={this.state.Traditional}
                  onChange={this.handleChange}
                />
              </label>
              </div>
              <hr/>
              <div>Lets Talk about income!</div>
              <div>
              <label>
                Annual Pensions
                <input
                  type="number"
                  name="AnnualPensions"
                  placeholder="Annual Pensions"
                  value={this.state.AnnualPensions}
                  onChange={this.handleChange}
                />
              </label>
              </div>
              <label>
                Social Security Annual Amount
                <input
                  type="number"
                  name="SocialSecurity"
                  placeholder="Annual Social Security Amount"
                  value={this.state.SocialSecurity}
                  onChange={this.handleChange}
                />
              </label>
              <div>
              <label>
                Other Income
                <input
                  type="number"
                  name="otherIncome"
                  placeholder="other income"
                  value={this.state.otherIncome}
                  onChange={this.handleChange}
                />
              </label>
              </div>
              <hr/>
              <div>How much will you need to live on? Don't include debt in the budget. Only essentials and funmoney.</div>
              <div>
              <label>
                Annual Budget
                <input
                  type="number"
                  name="AnnualBudget"
                  placeholder="Annual Budget"
                  value={this.state.AnnualBudget}
                  onChange={this.handleChange}
                />
              </label>
              </div>
              <div>
              <label>
                Total Debt
                <input
                  type="number"
                  name="totalDebts"
                  placeholder="total debt"
                  value={this.state.totalDebts}
                  onChange={this.handleChange}
                />
              </label>
              </div>
              <hr/>
              <span>Marriage Status: </span>
              <label>
                <input
                  type="radio"
                  value="single"
                  checked={this.state.status === "single"}
                  onChange={this.handleOptionChange}
                />
                Single
              </label>
              <label>
                <input
                  type="radio"
                  value="married"
                  checked={this.state.status === "married"}
                  onChange={this.handleOptionChange}
                />
                married
              </label>

              <button onClick={this.handleSubmit}>run the simulator!</button>
            </form>
          </div>
        ) : (
          <Loading
            email={this.state.email}
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
            firstName={this.state.firstName}
            lastName={this.props.lastName}
            removeClient={this.props.removeClient}
          />
        )}
      </div>
    );
  }
}

export default SuperForm;
