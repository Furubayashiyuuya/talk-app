import React from "react";
import "firebase/compat/database";

import { useSelector } from "react-redux";
import { useSearchProcess } from "../../hooks/searchProcess";
function Search() {
  const {
    targetevent,
    targetTopic,
    setTargetTopic,
    existingTopics,
    searchWord,
    setSearchWord,
    searchResult,
  } = useSearchProcess();
  const on = useSelector((state) => state.optionswitch);
  return (
    <>

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
              
    </>
  );
}

export default Search;
