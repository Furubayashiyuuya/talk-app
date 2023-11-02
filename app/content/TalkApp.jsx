"use client";

import React, { useState } from "react";
import TalkSide from "./TalkSide";
import "./TalkApp.css";
import TalkMain from "./TalkMain";
import { Provider } from "react-redux";
import store from "../Redux/store";
import TalkHead from "./TalkHead";

function TalkApp() {
  return (
    <Provider store={store}>
      <div className="talk">
        <TalkHead />
        <TalkSide />
        <TalkMain />
      </div>
    </Provider>
  );
}
export default TalkApp;
