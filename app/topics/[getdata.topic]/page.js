"use client";

import React from "react";
import TalkSide from "../../content/TalkSide";
import { Provider } from "react-redux";
import store from "../../Redux/store";
import TalkMain from "../../content/TalkMain";
import "../../content/TalkApp.css";
import { usePathname } from "next/navigation";
import TalkHead from "../../content/TalkHead";
function TalkApp() {
  const clicktopiname = decodeURIComponent(usePathname());
  
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
