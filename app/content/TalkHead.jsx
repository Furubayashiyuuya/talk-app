import React from "react";
import "firebase/compat/database";
import "./TalkApp.css";
import { useSelector } from "react-redux";
import { useSearchProcess } from "../hooks/searchProcess";
import { useStampcreateProcess } from "../hooks/stampcreateProcess";
function TalkHead() {
  const {
    searchevent,
    targetevent,
    targetTopic,
    setTargetTopic,
    existingTopics,
    searchWord,
    setSearchWord,
    searchResult,
  } = useSearchProcess();
  const {
    templatecreateevent,
    createstamp,
    existingStamps,
    newStampText,
    setNewStampText,
  } = useStampcreateProcess();
  const on = useSelector((state) => state.optionswitch);
  return (
    <>
      <div className="title">
        <h1>Talk</h1>
      </div>
      <div className="option">
        <h2
          className={`action ${on === "search" ? "clicked" : ""}`}
          onClick={searchevent}
        >
          Search
        </h2>
        <h2
          className={`action ${on === "createtemplate" ? "clicked" : ""}`}
          onClick={templatecreateevent}
        >
          CreateTemplate
        </h2>

        {on === "search" ? (
          <div className="search">
            <div className="search-where">
              <div className="select-item">
                <div>
                  <label htmlFor="topicname">TopicName</label>
                  <select
                    name="select"
                    id="select"
                    value={targetTopic}
                    onChange={(e) => setTargetTopic(e.target.value)}
                  >
                    <option selected>選択してください。</option>
                    {existingTopics.map((gettopicname, index) => (
                      <option key={index} value={gettopicname.topic}>
                        {gettopicname.topic}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="username">ユーザー名</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={searchWord}
                    onChange={(e) => setSearchWord(e.target.value)}
                  />
                </div>
              </div>
              {searchWord ? (
                <button onClick={targetevent}>search</button>
              ) : null}
            </div>
            <div className="result">
              <ul>
                {searchResult.map((message, index) => (
                  <div key={index} className="result-message">
                    <li>ユーザー名:{message.name}</li>
                    <li>{message.text}</li>
                  </div>
                ))}
                {searchResult.length === 0 && (
                  <p>該当するデータが見つかりませんでした。</p>
                )}
              </ul>
            </div>
          </div>
        ) : null}
        {on === "createtemplate" ? (
          <div className="createtemplate">
            <div className="create-area">
              <input
                type="text"
                name="newStampText"
                value={newStampText}
                onChange={(e) => setNewStampText(e.target.value)}
              />
              {newStampText ? (
                <button className="create-button" onClick={createstamp}>
                  作成
                </button>
              ) : null}
              <div className="stamlist">
                {existingStamps.map((getstamp, index) => (
                  <button key={index} className="stamp" value={getstamp.text}>
                    {getstamp.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default TalkHead;
