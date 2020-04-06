import React, { Component } from "react";
import AppConfig from "../utils/constants";

class InstBlotter extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
      favTickers: ["AAPL", "MSFT"],
      prices: [],
    };
  }

  componentDidMount = () => {
    const baseUrl = AppConfig.serverUrl;
    const tickers = this.state.favTickers.join(",");
    const url = "/get_instrument_prices?tickers=" + tickers;
    fetch(baseUrl + url, { mode: "cors" })
      .then((resp) => resp.json())
      .then((data) => this.setState({ prices: data }));
  };

  render() {
    const tableRows = this.state.prices.map((price) => {
      return (
        <tr>
          <td>{price.ticker}</td>
          <td>{price.bidPrice}</td>
          <td>{price.askPrice}</td>
          <td>{price.midPrice}</td>
        </tr>
      );
    });
    return (
      <React.Fragment>
        <div className="col-xl-4 col-lg-5">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                Stock Prices
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
              </div>
            </div>

            <div className="card-body">
              <table
                class="table table-bordered"
                id="dataTable"
                width="100%"
                cellspacing="0"
              >
                <thead>
                  <tr>
                    <th>Ticker</th>
                    <th>Bid</th>
                    <th>Ask</th>
                    <th>Mid</th>
                  </tr>
                </thead>
                <tbody>{tableRows}</tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default InstBlotter;
