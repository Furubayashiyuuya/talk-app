import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import TalkSide from "./TalkSide";
import "./TalkApp.css";
import TalkMain from "./TalkMain";

function TalkApp() {
  const topic = useSelector((state) => state.selectedTopic); // 使用するキーを確認
  const isOpen = useSelector((state) => state.isTopicOpen); // 使用するキーを確認

  console.log("選択されたトピック:", topic);
  console.log("トピックが開かれている:", isOpen);
  return (
    <>
      <div className="talk">
        <div className="title">
          <h1>Talk</h1>
        </div>
        <TalkSide />
        <TalkMain selectpas={topic} flg={isOpen} />
      </div>
    </>
  );
}

export default TalkApp;
