import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import * as serviceWorker from "./serviceWorker";

import App from "./App";
import { ConnectedRouter } from "connected-react-router";
import { CssBaseline } from "@material-ui/core";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import { history } from "./utils/history";
import { store } from "./app/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <CssBaseline />
        <App />
      </ConnectedRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
