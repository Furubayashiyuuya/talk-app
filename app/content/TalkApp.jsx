"use client";

import React, { useState } from "react";
import TalkSide from "./TalkSide";
import "./TalkApp.css";
import TalkMain from "./TalkMain";
import { Provider } from "react-redux";
import store from "../Redux/store";

function TalkApp() {
  const [on, seton] = useState(false);
  const serchevent = () => {
    seton(true);
  };
  return (
    <Provider store={store}>
      <div className="talk">
        <div className="title">
          <h1>Talk</h1>
        </div>

        <TalkSide />
        <TalkMain />
      </div>
    </Provider>
  );
}
export default TalkApp;
