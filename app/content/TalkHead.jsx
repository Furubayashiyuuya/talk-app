import React from "react";
import "firebase/compat/database";
import "./TalkApp.css";
import { useSelector } from "react-redux";
import { useHeadProcess } from "../hooks/headProcess";
function TalkHead() {
  const {
    searchevent,
    createtemplateevent,
    targetevent,
    createstamp,
    targettopic,
    settargettopic,
    exeisningtopics,
    exeisningstamps,
    searchword,
    setsearchword,
    result,
    newstamptext,
    setnewstamptext,
    isClicked,
  } = useHeadProcess();
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
          onClick={createtemplateevent}
        >
          CreateTemplate
        </h2>

        {on === "search" ? (
          <div className="search">
            <div className="searchwhere">
              <div className="selectitem">
                <div>
                <label htmlFor="topicname">TopicName</label>
                <select
                  name="select"
                  id="select"
                  value={targettopic}
                  onChange={(e) => settargettopic(e.target.value)}
                >
                  {exeisningtopics.map((gettopicname, index) => (
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
                  value={searchword}
                  onChange={(e) => setsearchword(e.target.value)}
                />
                </div>
              </div>
              {searchword ? (
                <button onClick={targetevent}>search</button>
              ) : null}
            </div>
            <div className="result">
              <ul>
                {result.map((message, index) => (
                  <div key={index} className="resultmessage">
                    <li>ユーザー名:{message.name}</li>
                    <li>{message.text}</li>
                  </div>
                ))}
                {result.length === 0 && (
                  <p>該当するデータが見つかりませんでした。</p>
                )}
              </ul>
            </div>
          </div>
        ) : null}
        {on === "createtemplate" ? (
          <div className="createtemplate">
            <div className="createarea">
              <input
                type="text"
                name="newstamptext"
                value={newstamptext}
                onChange={(e) => setnewstamptext(e.target.value)}
              />
              {newstamptext ? (
                <button className="createbutton" onClick={createstamp}>
                  作成
                </button>
              ) : null}
              <div className="stamlist">
                {exeisningstamps.map((getstamp, index) => (
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
