import React, { Component } from "react";
import Card from "./card";

class DashboardSummary extends Component {
  state = {
    accountId: 1,
    results: {
      daily: 0,
      mtd: 0,
      orderCount: 0,
      test: 0,
    },
  };
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <Card
            header="Monthly Earning"
            url="/acctsummary"
            id="mtd"
            result={this.props.results["mtd"]}
          />
          <Card
            header="Daily P/L"
            url="/acctsummary"
            id="daily"
            result={this.props.results["daily"]}
          />
          <Card
            header="Order Count"
            url="/orders/count/1"
            id="orderCount"
            result={this.props.results["orderCount"]}
          />
          <Card
            header="Some Other"
            url="/acctsummary"
            id="test"
            result={this.props.results["test"]}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default DashboardSummary;
