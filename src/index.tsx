import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "@ahaui/css/dist/index.min.css";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import store from "store/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
