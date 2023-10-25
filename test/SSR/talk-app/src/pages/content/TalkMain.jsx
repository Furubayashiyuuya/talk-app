import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
//import { useSelector, useDispatch } from "react-redux";
import { useMainProcess } from "../hooks/mainProcess";
import "./TalkMain.css";
//import Templatebutton from "./Templatebutton";
import Pagination from "./Pagination";
function TalkMain() {
  const{
    setMessageName,
    setMessageText,
    addData,
    stampswich,
    isloading,
    isOpen,
    displayedData,
    totalPages,
    currentPage,
    handlePageChange,
    messageName,
    messageText,
    fixedMessage,
    selectedTopic,
    Templatebutton
  } = useMainProcess();
   return (
    <div className="main">
      {isloading ? (
        <div className="loading">Loading</div>
      ) : (
        <>
          <ul>
            {isOpen &&
              (displayedData.length > 2 ? (
                displayedData.map((indata, index) => {
                  const datacheck =
                    typeof indata === "object" && "name" in indata;

                  return datacheck ? (
                    <div className="talk-item" key={index}>
                      <li className="user-name">ユーザー名: {indata.name}</li>
                      <li className="user-text">{indata.text}</li>
                    </div>
                  ) : null;
                })
              ) : (
                <div className="start-text">
                  <h2>Let's start Talking</h2>
                </div>
              ))}
          </ul>
          {isOpen && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          )}
          {isOpen ? (
            //投稿レイアウト
            <div className="data-form">
              <label className="name-label">ユーザー名</label>
              <br />
              <input
                className="name-input"
                type="text"
                name="name"
                value={messageName}
                onChange={(e) => setMessageName(e.target.value)}
              />
              <br />
              <label className="text-label">コメント</label>
              <br />
              <input
                className="text-input"
                type="text"
                name="text"
                maxLength="150"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
              <br />
              {!fixedMessage ? (
                <button
                  className="submit-button"
                  onClick={() => addData(selectedTopic)}
                >
                  送信
                </button>
              ) : (
                <></>
              )}
              {!fixedMessage ? (
                <button
                  className="template-button"
                  onClick={() => stampswich()}
                >
                  テンプレート
                </button>
              ) : (
                <></>
              )}
              {fixedMessage ? <Templatebutton stampswich={stampswich} setMessageText={setMessageText} /> : <></>}

            </div>
          ) : (
            <h2>気になるTopicをクリックして、Talkを始めよう。</h2>
          )}
        </>
      )}
    </div>
  );
}
export default TalkMain;
