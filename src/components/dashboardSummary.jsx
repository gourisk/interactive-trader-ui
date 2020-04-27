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
            header="Account Balance"
            url="/acctsummary"
            id="mtd"
            result={this.props.summary.accountBalance}
          />

          <Card
            header="Order Count"
            url="/orders/count/1"
            id="orderCount"
            result={this.props.summary.orderCount}
          />

          <Card
            header="Daily P/L"
            url="/acctsummary"
            id="daily"
            result={this.props.summary.dailyPL}
          />

          <Card
            header="MTD P/L"
            url="/acctsummary"
            id="test"
            result={this.props.summary.mtdPL}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default DashboardSummary;
