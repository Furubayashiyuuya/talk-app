"use client";
import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { useSelector, useDispatch } from "react-redux";
import { useMainProcess } from "../hooks/mainProcess";
import "./TalkMain.css";
import Pagination from "./Pagination";
function TalkMain() {
  const {
    setMessageName,
    setMessageText,
    addData,
    stampswitch,
    isloading,
    isTopicOpen,
    displayedMessages,
    totalPageCount,
    currentPage,
    handlePageChange,
    messageName,
    messageText,
    fixedMessage,
    dataSubmit,
    Templatebutton,
  } = useMainProcess();
  return (
    <div className="main">
      {isloading ? (
        <div className="loading">Loading</div>
      ) : (
        <>
          <ul>
            {isTopicOpen &&
              (displayedMessages.length > 2 ? (
                displayedMessages.map((indata, index) => {
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
                  <h2>Let&apos;s start Talking</h2>
                </div>
              ))}
          </ul>
          {isTopicOpen && (
            <Pagination
              totalPageCount={totalPageCount}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          )}
          {isTopicOpen ? (
            //投稿レイアウト
            <div className="data-form">
              <div className="form-name">
                <label className="name-label">ユーザー名</label>
                <input
                  className="name-input"
                  type="text"
                  name="name"
                  value={messageName}
                  onChange={(e) => setMessageName(e.target.value)}
                />
              </div>
              <br />
              <div className="text-form">
                <label className="text-label">コメント</label>
                <input
                  className="text-input"
                  type="text"
                  name="text"
                  maxLength="150"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
              </div>
              <br />
              {!fixedMessage ? (
                <button
                  className="template-button"
                  onClick={() => stampswitch()}
                >
                  テンプレート
                </button>
              ) : (
                <></>
              )}
              {!fixedMessage ? (
                <button
                  className="submit-button"
                  onClick={() => addData(dataSubmit)}
                >
                  送信
                </button>
              ) : (
                <></>
              )}

              {fixedMessage ? (
                <Templatebutton
                  stampswitch={stampswitch}
                  setMessageText={setMessageText}
                />
              ) : (
                <></>
              )}
            </div>
          ) : (
            <div className="start-text">
              <h2>気になるTopicをクリックして、Talkを始めよう。</h2>
            </div>
          )}
        </>
      )}
    </div>
  );
}
export default TalkMain;
