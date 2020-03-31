import React from "react";
import axios from "axios";
import SuperForm from "./SuperForm.jsx";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

 // const URL = 'http://localhost:8080';
 const URL = 'https://mustang-node-qb3jp3n5oa-ue.a.run.app';

class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: true,
      simulation: this.props.simulation || false,
      firstName: this.props.clientFirstName,
      lastName: this.props.clientLastName,
      userFirstName: this.props.firstName,
      userLastName: this.props.lastName,
      email: this.props.email,
      uid: this.props.uid,
      age: this.props.age || 0,
      savings: this.props.savings || 0,
      RothIRA: this.props.RothIRA || 0,
      IRA: this.props.IRA || 0,
      Traditional401K: this.props.Traditional401K || 0,
      Traditional: this.props.Traditional || 0,
      AnnualBudget: this.props.AnnualBudget || 0,
      AnnualPensions: this.props.AnnualPensions || 0,
      SocialSecurityAge: this.props.SocialSecurityAge || 0,
      SocialSecurity: this.props.SocialSecurity || 0,
      otherIncome: this.props.otherIncome || 0,
      totalDebts: this.props.totalDebts || 0,
      status: this.props.status || "single",
      success: this.props.success || 0,
      nestEgg: [],
      taxes: []
    };
  }




  componentDidMount() {

    axios
      .get(`${URL}/dashboard/${this.props.email}`)
      .then(data => {
        if (data.data[0].simulation === false) {
          this.setState({
            simulation: data.data[0].simulation,
            nestEgg: data.data[0].nestEgg,
            taxes: data.data[0].taxes,
            spinner: false,
          })
        } else {

          this.setState({
            simulation: data.data[0].simulation,
            nestEgg: data.data[0].nestEgg,
            taxes: data.data[0].taxes,
            success: data.data[0].success,
            age: data.data[0].age,
            savings: data.data[0].savings,
            RothIRA: data.data[0].RothIRA,
            IRA: data.data[0].IRA,
            Traditional401K: data.data[0].Traditional401K,
            Traditional: data.data[0].Traditional,
            AnnualBudget: data.data[0].annualBudget,
            AnnualPensions: data.data[0].annualPensions,
            SocialSecurityAge: data.data[0].SocialSecurityAge,
            SocialSecurity: data.data[0].SocialSecurity,
            otherIncome: data.data[0].otherIncome,
            totalDebts: data.data[0].debts,
            status: data.data[0].status,
            spinner: false
          })
        }
          }
        );
      }

  render() {
    return (
      <div>
        {this.state.spinner ? <div id="spinner"></div>
        : !this.state.simulation ? (
          <SuperForm
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            email={this.state.email}
            age={this.state.age}
            savings={this.state.savings}
            RothIRA={this.state.RothIRA}
            IRA={this.state.IRA}
            Traditional={this.state.Traditional}
            Traditional401K={this.state.Traditional401K}
            AnnualBudget={this.state.AnnualBudget}
            AnnualPensions={this.state.AnnualPensions}
            SocialSecurity={this.state.SocialSecurity}
            SocialSecurityAge={this.state.SocialSecurityAge}
            otherIncome={this.state.otherIncome}
            totalDebts={this.state.totalDebts}
            status={this.state.status}
            changeClient={this.props.changeClient}
            success={this.state.success}
            removeClient={this.props.removeClient}
          />
        ) : (
          <div>
            <div>
              dashboard for {this.state.firstName} {this.state.lastName}
              <button onClick={() => this.setState({ simulation: false })}>
                run new simulation
              </button>
              <button onClick={this.props.removeClient}>Change Client</button>

              <HighchartsReact
                highcharts={Highcharts}
                options={{
                  chart: {
                    type: "scatter",
                    zoomType: "xy"
                  },
                  accessibility: {
                    description: `tax chart for ${this.state.firstName} ${this.state.lastName}`
                  },
                  title: {
                    text: `Tax Chart for ${this.state.firstName} ${this.state.lastName}`
                  },
                  xAxis: {
                    title: {
                      enabled: true,
                      text: "age"
                    },
                    startOnTick: true,
                    endOnTick: true,
                    showLastLabel: true
                  },
                  yAxis: {
                    title: {
                      text: "Dollars"
                    }
                  },
                  legend: {
                    layout: "vertical",
                    align: "left",
                    verticalAlign: "top",
                    x: 100,
                    y: 70,
                    floating: true,
                    backgroundColor:
                      Highcharts.defaultOptions.chart.backgroundColor,
                    borderWidth: 1
                  },
                  plotOptions: {
                    scatter: {
                      marker: {
                        radius: 5,
                        states: {
                          hover: {
                            enabled: true,
                            lineColor: "rgb(100,100,100)"
                          }
                        }
                      },
                      states: { hover: { marker: { enabled: false } } },
                      tooltip: {
                        headerFormat: "<b>{series.name}</b><br>",
                        pointFormat: "age {point.x}, ${point.y}"
                      }
                    }
                  },
                  series: this.state.taxes.map((taxx, ii) => {
                    return {
                      name: ii,
                      color: "rgba(223, 83, 83, .5)",
                      data: taxx.map((tax, i) => {
                        tax = Number(tax);
                        return [i + 60, tax];
                      })
                      /* [[161.2, 51.6]] */
                    };
                  })
                }}
              />
              
              <HighchartsReact
                highcharts={Highcharts}
                options={{
                  chart: {
                    type: "scatter",
                    zoomType: "xy"
                  },
                  accessibility: {
                    description: `Nest Egg for ${this.state.firstName} ${this.state.lastName}`
                  },
                  title: {
                    text: `Nest Egg for ${this.state.firstName} ${this.state.lastName}, Success Rate: ${this.state.success}% (85% is optimal)`
                  },
                  xAxis: {
                    title: {
                      enabled: true,
                      text: "age"
                    },
                    startOnTick: true,
                    endOnTick: true,
                    showLastLabel: true
                  },
                  yAxis: {
                    title: {
                      text: "Dollars"
                    }
                  },
                  legend: {
                    layout: "vertical",
                    align: "left",
                    verticalAlign: "top",
                    x: 100,
                    y: 70,
                    floating: true,
                    backgroundColor:
                      Highcharts.defaultOptions.chart.backgroundColor,
                    borderWidth: 1
                  },
                  plotOptions: {
                    scatter: {
                      marker: {
                        radius: 5,
                        states: {
                          hover: {
                            enabled: true,
                            lineColor: "rgb(100,100,100)"
                          }
                        }
                      },
                      states: { hover: { marker: { enabled: false } } },
                      tooltip: {
                        headerFormat: "<b>{series.name}</b><br>",
                        pointFormat: "age {point.x}, ${point.y}"
                      }
                    }
                  },
                  series: this.state.nestEgg.map((taxx, ii) => {
                    return {
                      name: ii + 9,
                      color: `rgba(119, ${ii * 12}, 191, .5)`,
                      data: taxx.map((tax, i) => {
                        tax = Number(tax);
                        return [i + 60, tax];
                      })
                      /* [[161.2, 51.6]] */
                    };
                  })
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default DashBoard;
