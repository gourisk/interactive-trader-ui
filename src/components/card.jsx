import React, { Component } from "react";
import AppConfig from "../utils/constants";
import { getData } from "../utils/remoteUtils";

class Card extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
      header: props.header,
      url: props.url,
      result: 100,
    };
  }

  componentDidMount = () => {
    fetch(AppConfig.serverUrl + this.state.url, { mode: "cors" })
      .then((resp) => resp.json())
      .then((data) => this.setState({ result: data.result }));
  };

  render() {
    return (
      <React.Fragment>
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    {this.props.header}
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {this.props.result === undefined
                      ? ""
                      : this.props.result.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Card;
