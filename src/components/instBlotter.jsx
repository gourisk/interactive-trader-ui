import React, { Component } from "react";
import AppConfig from "../utils/constants";
import { getData } from "../utils/remoteUtils";
import SockJsClient from "react-stomp";

class InstBlotter extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
      favTickers: ["AAPL", "MSFT"],
      customTicker: "",
      prices: [],
    };
  }

  handleChangeCustomTicker = (e) => {
    const inputValue = e.target.value;
    if (inputValue) {
      this.setState({ customTicker: inputValue });
    }
  };

  handleClickAddTicker = (e) => {
    const { customTicker, favTickers } = this.state;
    console.log("custom ticker: ", customTicker);
    if (customTicker) {
      const newTickers = [...favTickers, customTicker];
      this.setState(
        {
          favTickers: newTickers,
          customTicker: "",
        },
        () => {
          console.log("Fav Tickers: ", this.state.favTickers);
          this.refreshPrices();
        }
      );
    }
  };

  refreshPrices = () => {
    const baseUrl = AppConfig.serverUrl;
    const tickers = this.state.favTickers.join(",");
    const url = "/get_instrument_prices?tickers=" + tickers;
    fetch(baseUrl + url, { mode: "cors" })
      .then((resp) => resp.json())
      .then((data) => this.setState({ prices: data }));
  };

  componentDidMount = () => {
    this.refreshPrices();
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
        <SockJsClient
          url={AppConfig.socketUrl}
          topics={[AppConfig.instTopic]}
          onMessage={(msg) => {
            console.log(msg);
            if (msg.ticker) {
              const ticker = msg.ticker;
              const { favTickers } = this.state;
              if (favTickers.includes(ticker)) {
                const { prices } = this.state;
                const otherPrices = prices.filter(
                  (row) => row.ticker != ticker
                );
                this.setState({ prices: [...otherPrices, msg] });
              }
            }
          }}
          ref={(client) => {
            this.clientRef = client;
          }}
        />

        <div className="col-xl-4 col-lg-5">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                Stock Prices
              </h6>
              <div className="dropdown no-arrow">
                <input
                  type="text"
                  id="customTickerInputBox"
                  placeholder="Add stock to watch"
                  onChange={this.handleChangeCustomTicker}
                />
                <a
                  href="#"
                  class="btn btn-sm btn-primary text-white"
                  onClick={this.handleClickAddTicker}
                  id="btnAddTicker"
                >
                  <i class="fas fa-arrow-right">+</i>
                </a>
              </div>
            </div>

            <div className="card-body">
              <table
                class="table table-sm table-bordered"
                id="dataTable"
                width="100%"
                cellSpacing="0"
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
