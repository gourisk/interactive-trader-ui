import React, { Component } from "react";
import { Link } from "react-router-dom";

class SideBar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <ul
          className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
          id="accordionSidebar"
        >
          <a
            className="sidebar-brand d-flex align-items-center justify-content-center"
            href="index.html"
          >
            <div className="sidebar-brand-icon rotate-n-15">
              <i className="fas fa-laugh-wink"></i>
            </div>
            <div className="sidebar-brand-text mx-3">
              Interactive Trader <sup>TM</sup>
            </div>
          </a>

          <hr className="sidebar-divider my-0" />

          <li className="nav-item active">
            <Link to="/blotter">
              <a className="nav-link">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>Blotter</span>
              </a>
            </Link>
          </li>

          <hr className="sidebar-divider" />

          <div className="sidebar-heading">Others</div>

          <li className="nav-item">
            <a className="nav-link" href="charts.html">
              <i className="fas fa-fw fa-chart-area"></i>
              <span>New Order</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="tables.html">
              <i className="fas fa-fw fa-table"></i>
              <span>Search Order</span>
            </a>
          </li>

          <hr className="sidebar-divider d-none d-md-block" />
        </ul>
      </React.Fragment>
    );
  }
}

export default SideBar;
