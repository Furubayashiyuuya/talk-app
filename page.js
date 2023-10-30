import React from "react";
import ReactDOM from "react-dom";
import TalkApp from "./content/TalkApp";
function Home() {
//  ReactDOM.hydrate(<TalkApp />, document.getElementById("root"));
  return (
    <div id="root">
    <TalkApp />
    </div>
  );
}

export default Home;
