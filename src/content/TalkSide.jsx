import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "./TalkSide.css";
import { setSelectedTopic, setIsTopicOpen } from "../Redux/actions";

import { useDispatch } from "react-redux";
import { useSideProcess } from "../hooks/sideProcess";

function TalkSide() {
  const {
    topicData,
    topicName,
    loading,
    setTopicName,
    addTopic,
    open,
    setSortOption,
    openTopicIndex,
  } = useSideProcess();
  return (
    <>
      <div className="side">
        <h2>Topic</h2>
        <div className="inputarea">
          <input
            className="side-input-name"
            type="text"
            name="topicname"
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
          />
          <div className="side-select">
            <select
              className="topic-select"
              name="select"
              id="select"
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="new">新しい順</option>
              <option value="make">あいうえ順</option>
            </select>
            <button
              className="topic-button"
              onClick={() => addTopic({ topic: topicName })}
            >
              作成
            </button>
          </div>
        </div>
        <div className="side-items">
          {topicData.map(
            (getdata, index) =>
              index !== topicData.length && (
                <div
                  key={getdata.topic}
                  className={`topic-item ${
                    openTopicIndex === index ? "selected" : ""
                  }`}
                  onClick={() => {
                    open(getdata.topic, index);
                  }}
                >
                  <li>{getdata.topic}</li>
                </div>
              ),
          )}
        </div>
      </div>
    </>
  );
}
export default TalkSide;
