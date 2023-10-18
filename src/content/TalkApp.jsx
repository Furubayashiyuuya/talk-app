import React, { useState } from "react";


import TalkSide from "./TalkSide";
import "./TalkApp.css";
import TalkMain from "./TalkMain";

function TalkApp() {
  return (
    <>
      <div className="talk">
        <div className="title">
          <h1>Talk</h1>
        </div>
        <TalkSide />
        <TalkMain />
      </div>
    </>
  );
}

export default TalkApp;
