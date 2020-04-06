import React, { Component } from "react";
import Card from "./card";

class DashboardSummary extends Component {
  state = {
    accountId: 1,
  };
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <Card header="Monthly Earning" url="/acctsummary" />
          <Card header="Total P/L" url="/acctsummary" />
          <Card header="Order Count" url="/orders/count/1" />
          <Card header="Some Other" url="/acctsummary" />
        </div>
      </React.Fragment>
    );
  }
}

export default DashboardSummary;
