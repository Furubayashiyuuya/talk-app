import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import TalkApp from "./content/TalkApp";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./content/store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store} >
    <TalkApp />
  </Provider>,
);

reportWebVitals();
