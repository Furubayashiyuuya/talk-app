import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "./TalkApp.css";
import TalkSide from "./TalkSide";
function TalkApp() {

  return (
    <div className="talk">
      
      <TalkSide />
    </div>
  );
}
export default TalkApp;
