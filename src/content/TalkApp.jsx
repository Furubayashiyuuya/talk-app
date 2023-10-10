import React from "react";
import TalkSide from "./TalkSide";
import  "./TalkApp.css";
function TalkApp() {
  console.log("API Key:", process.env.REACT_APP_FIREBASE_APIKEY);
console.log("Database URL:", process.env.REACT_APP_FIREBASE_DATABASE_URL);
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
