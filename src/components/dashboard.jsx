import React, { Component } from "react";
import DashboardSummary from "./dashboardSummary";
import PositionBlotter from "./positionBlotter";
import InstBlotteer from "./instBlotter";
import AppConfig from "../utils/constants";

class Dashboard extends Component {
  state = {
    accountId: 1,
    results: {
      daily: 0,
      mtd: 0,
      orderCount: 0,
      test: 0,
    },
  };

  constructor(props) {
    super(props);
    this.reloadTradeCount();
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
      .then((data) =>
        this.setState({ results: { ...results, orderCount: data.result } })
      );
  };

  render() {
    return (
      <div>
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-primary">Dashboard</h1>
        </div>

        <DashboardSummary results={this.state.results} />
        <div className="row">
          <PositionBlotter reloadTradeCount={this.reloadTradeCount} />
          <InstBlotteer />
        </div>
      </div>
    );
  }
}

export default Dashboard;
