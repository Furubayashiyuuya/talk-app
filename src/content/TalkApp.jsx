import React from "react";
import TalkSide from "./TalkSide";
import  "./TalkApp.css";
function TalkApp() {
  return (
    <>
    <div className="talk">
    <div className="title">
        <h1>Talk</h1>
      </div>
      <TalkSide />
    </div>
    </>
  );
}
export default TalkApp;
