import React, { Component } from "react";
import AppConfig from "../utils/constants";
import { createSocket } from "../utils/socketUtils";
import SockJsClient from "react-stomp";

class PositionBlotter extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
      accountId: 1,
      orders: [],
    };
  }

  componentDidMount = () => {
    const baseUrl = AppConfig.serverUrl;
    fetch(baseUrl + "/orders/" + this.state.accountId)
      .then((resp) => resp.json())
      .then((data) => this.setState({ orders: data }));
  };

  render() {
    const tableRows = this.state.orders.map((order) => {
      return (
        <tr>
          <td>{order.orderId}</td>
          <td>{order.ticker}</td>
          <td>{order.quantity}</td>
          <td>{order.price}</td>
          <td>{order.marketValue}</td>
          <td>{order.tradeDate}</td>
          <td>{order.executedTime}</td>
        </tr>
      );
    });

    return (
      <React.Fragment>
        <div>
          <SockJsClient
            url="http://localhost:8080/ibk-ws"
            topics={["/topics/trades"]}
            onMessage={(msg) => {
              console.log(msg);
              if (msg.orderId) {
                //check if valid  message
                const { orders } = this.state;
                this.setState({ orders: [msg, ...orders] });
                this.props.reloadTradeCount();
              }
            }}
            ref={(client) => {
              this.clientRef = client;
            }}
          />
        </div>
        <div className="col-xl-8 col-lg-7">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                Position Blotter
              </h6>
              <div className="dropdown no-arrow">
                <a
                  className="dropdown-toggle"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                  aria-labelledby="dropdownMenuLink"
                >
                  <div className="dropdown-header">Dropdown Header:</div>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table
                  class="table table-sm table-bordered"
                  id="dataTable"
                  width="100%"
                  cellspacing="0"
                >
                  <thead>
                    <tr>
                      <th>Order Id</th>
                      <th>Ticker</th>
                      <th>Quanity</th>
                      <th>Price</th>
                      <th>Market Value</th>
                      <th>Trade Date</th>
                      <th>Exec Date</th>
                    </tr>
                  </thead>
                  <tbody>{tableRows}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PositionBlotter;
