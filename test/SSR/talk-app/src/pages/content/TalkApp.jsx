import React, { useState } from "react";

import TalkSide from "./TalkSide";
import "./TalkApp.css";
import TalkMain from "./TalkMain";

function TalkApp() {
  const [on, seton] = useState(false);
  const serchevent = () => {
    seton(true);
  };
  return (
    <>
      <div className="talk">
        <div className="title">
          <h1>Talk</h1>
        </div>
        <div className="test">
          <h1 className="serch" onClick={serchevent}>
            Serch
          </h1>
          {on ? <p>クリック</p> : null}
          <h1 className="serch">Serch2</h1>
          <h1 className="serch">Serch3</h1>
          <h1 className="serch">Serch4</h1>
        </div>
        <TalkSide />
        <TalkMain />
      </div>
    </>
  );
}

export default TalkApp;
