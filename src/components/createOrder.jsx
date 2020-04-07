import React, { Component } from "react";
import InstBlotter from "./instBlotter";
import { Formik, FormikProps, Form, Field } from "formik";
import AppConfig from "../utils/constants";

class OrderComponent extends Component {
  state = {
    accountId: 1,
    favTickers: ["AAPL", "MSFT"],
    customTicker: "",
    prices: [],
    lastOrder: {},
    tradeDate: "",
    buySell: "B",
    ticker: "",
    issuer: "",
    quantity: 0,
    price: 0.0,
  };

  constructor() {
    super();
  }

  handleSubmit = (e) => {
    const baseUrl = AppConfig.serverUrl;
    const inputOrder = {
      accountByTraderId: { accountId: this.state.accountId },
      instrument: { ticker: this.state.ticker },
      quantity: this.state.quantity,
      price: this.state.price,
      /*marketValue: this.state.price * this.state.quantity, */
      buySellFlag: this.state.buySell,
      orderDesc: this.state.ticker,
      tradeDate: this.state.tradeDate,
      executedTime: Date.now(),
      tradeSource: "NASDAQGS",
    };
    console.log("input order to be sent: ", inputOrder);
    /* Post Order to server */
    fetch(baseUrl + "/orders/create", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify(inputOrder),
    })
      .then((resp) => resp.json())
      .then((data) => this.setState({ lastOrder: data || {} }));
    return;
  };

  handleFormPropertyChange = (e) => {
    const propertyId = e.target.id;
    const propertyValue = e.target.value;
    console.log("property set for ", propertyId, "as: ", propertyValue);

    switch (propertyId) {
      case "ticker":
        const baseUrl = AppConfig.serverUrl;
        fetch(baseUrl + "/instrument/" + propertyValue, { mode: "cors" })
          .then((resp) => resp.json())
          .then((data) =>
            this.setState({ ticker: data.ticker, issuer: data.issuer })
          );
        break;
      case "price":
        this.setState({ price: parseFloat(propertyValue) });
        break;
      case "quantity":
        this.setState({ quantity: parseInt(propertyValue) });
        break;
      case "tradeDate":
        const localDate = new Date().toISOString();
        const offset = localDate.substring(10, localDate.length);
        this.setState({ tradeDate: Date.parse(propertyValue + offset) });
        break;
      case "buySell":
        this.setState({ buySell: propertyValue });
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <div className="container">
        <div className="card o-hidden border-0 shadow-lg my-2">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-lg-6">
                <div className="p-2">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Create new Order</h1>
                  </div>
                  <form className="user">
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="ticker"
                          placeholder="Ticker"
                          onBlur={this.handleFormPropertyChange}
                        />
                      </div>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="issuer"
                          placeholder="Issuer"
                          disabled="true"
                          value={this.state.issuer}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="quantity"
                          placeholder="quantity"
                          onBlur={this.handleFormPropertyChange}
                        />
                      </div>
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="price"
                          placeholder="Price"
                          onBlur={this.handleFormPropertyChange}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <select
                          className="form-control form-control-user"
                          id="buySell"
                          onBlur={this.handleFormPropertyChange}
                        >
                          <option value="B">Buy</option>
                          <option value="S">Sell</option>
                        </select>
                      </div>
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="tradeDate"
                          placeholder="date "
                          onBlur={this.handleFormPropertyChange}
                        />
                      </div>
                    </div>
                    <a
                      href="#"
                      className="btn btn-primary btn-user"
                      onClick={this.handleSubmit}
                    >
                      Create
                    </a>
                  </form>
                </div>
              </div>
              <div className="col-lg-6 col-xl">
                <InstBlotter />
              </div>
            </div>
            <div>
              <h4>Order created with Id= {this.state.lastOrder.orderId}</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderComponent;
