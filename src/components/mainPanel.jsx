import React, { Component } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Dashboard from "./dashboard";
import OrderComponent from "./createOrder";

class MainPanel extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/"></Route>
          <Route path="/blotter">
            <Dashboard />
          </Route>
          <Route path="/createOrder">
            <OrderComponent />
          </Route>
        </Switch>
      </React.Fragment>
    );
  }
}

export default MainPanel;
