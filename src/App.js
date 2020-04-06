import React, { Component } from "react";
import "./css/sb-admin-2.min.css";
import SideBar from "./components/sideBar";
import Header from "./components/header";
import MainPanel from "./components/mainPanel";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

class App extends Component {
  state = {};
  render() {
    return (
      <Router>
        <React.Fragment>
          <div id="leftSideBar">
            <SideBar />
          </div>

          <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
              <div id="topbar">
                <Header />
              </div>

              <div class="container-fluid" id="mainPanel">
                <MainPanel />
              </div>
            </div>

            <footer class="sticky-footer bg-white">
              <div class="container my-auto">
                <div class="copyright text-center my-auto">
                  <span>Copyright &copy; Your Website 2019</span>
                </div>
              </div>
            </footer>
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
