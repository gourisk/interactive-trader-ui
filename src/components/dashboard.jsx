import React, { Component } from "react";
import DashboardSummary from "./dashboardSummary";
import PositionBlotter from "./positionBlotter";
import InstBlotteer from "./instBlotter";

class Dashboard extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-primary">Dashboard</h1>
          <a
            href="#"
            className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          >
            <i className="fas fa-download fa-sm text-white-50"></i> Generate
            Report
          </a>
        </div>

        <DashboardSummary />
        <div className="row">
          <PositionBlotter />
          <InstBlotteer />
        </div>
      </div>
    );
  }
}

export default Dashboard;
