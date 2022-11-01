import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { registerServiceWorker } from './serviceWorker'
import { BrowserRouter } from "react-router-dom";

// console.log = () => {};
// console.error = () => {};
// console.debug = () => {};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

registerServiceWorker()
