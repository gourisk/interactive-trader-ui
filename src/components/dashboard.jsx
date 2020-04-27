import React, { Component } from "react";
import DashboardSummary from "./dashboardSummary";
import PositionBlotter from "./positionBlotter";
import InstBlotteer from "./instBlotter";
import AppConfig from "../utils/constants";

class Dashboard extends Component {
  state = {
    accountId: 1,
    accountSummary: {},
    results: {
      daily: 0,
      mtd: 0,
      orderCount: 0,
      test: 0,
    },
  };

  constructor(props) {
    super(props);
    this.reloadSummary();
  }

  tradeChanged = (e) => {
    const { results } = this.state;
    var tradeCount = results["orderCount"];
    const newResults = { ...results, orderCount: tradeCount + 1 };
    this.setState({ results: newResults });
  };

  reloadTradeCount = () => {
    const { results } = this.state;
    fetch(AppConfig.serverUrl + "/orders/count/" + this.state.accountId, {
      mode: "cors",
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result.success)
          this.setState({ results: { ...results, orderCount: result.data } });
      });
  };

  reloadSummary = () => {
    fetch(AppConfig.serverUrl + "/acctsummary/" + this.state.accountId, {
      mode: "cors",
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result.success) {
          this.setState({ accountSummary: result.data });
        }
      });
  };

  render() {
    return (
      <div>
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-primary">Dashboard</h1>
        </div>

        <DashboardSummary
          results={this.state.results}
          summary={this.state.accountSummary}
        />
        <div className="row">
          <PositionBlotter reloadTradeCount={this.reloadSummary} />
          <InstBlotteer />
        </div>
      </div>
    );
  }
}

export default Dashboard;
