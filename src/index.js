import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
// for router
import { BrowserRouter } from "react-router-dom";
// to install fontawesome
import "@fortawesome/fontawesome-free/css/all.min.css";
import Context from "./pages/client/context/Context";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Context>
      <App />
    </Context>
  </BrowserRouter>
);
