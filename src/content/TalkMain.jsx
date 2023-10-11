import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "./TalkMain.css";
import Pagination from "./Pagination";
function TalkMain({ selectpas, flg }) {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  };
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
  let topicswitch = flg;
  const [messageName, setMessageName] = useState();
  const [messageText, setMessageText] = useState();
  const [fixedMessage, setFixedMessage] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [openTopicindex, getOpenTopicIndex] = useState(-1);
  const [messageData, getMessageData] = useState([]);
  //ページネーション
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedData = messageData.slice(startIndex, endIndex);
  const totalDataCount = messageData.length - 2; // 先頭データがタイムスタンプとトピック名であるため除いている
  const totalPages = Math.ceil(totalDataCount / pageSize);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const getMessages = (index) => {
    database.ref(`Talk/topics/${selectpas}`).on("value", function (snapshot) {
      const data = snapshot.val();
      const userDataArray = Object.values(data);
      getMessageData(userDataArray); //topic直下のDBデータの取得
      console.log(userDataArray)
      getOpenTopicIndex(index);
    });
  };
  //入力データの追加
  const addData = () => {
    const data = {
      name: messageName,
      text: messageText,
    };
    database.ref(`Talk/topics/${selectpas}`).push(data);
    setMessageText("");
    getMessages();
  };
  //固定メッセージ
  const stampswich = () => {
    if (fixedMessage === false) {
      setFixedMessage(true);
    } else {
      setFixedMessage(false);
    }
  };
  const Templatebutton = () => {
    const templates = [
      "こんにちは",
      "よろしくお願いします。",
      "ありがとうございます。",
      "それな",
      "草",
      "wktk",
      "wwwww",
    ];
    return (
      <div className="template-menu">
        {templates.map((template, index) => (
          <button key={index} onClick={() => setMessageText(template)}>
            {template}
          </button>
        ))}
        <br />
        <button className="close-button" onClick={() => stampswich()}>
          閉じる
        </button>
      </div>
    );
  };
  useEffect(() => {
    getMessages();
  }, [selectpas]);
  return (
    <div className="main">
      <ul>
        {topicswitch &&
          (displayedData.length > 2 ? (
            displayedData.map((indata, index) => {
              const datacheck = typeof indata === "object" && "name" in indata;

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
      {topicswitch && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      )}
      {topicswitch ? (
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
            <button className="template-button" onClick={() => stampswich()}>
              テンプレート
            </button>
          ) : (
            <></>
          )}
          {fixedMessage ? <Templatebutton /> : <></>}
        </div>
      ) : (
        <h2>気になるTopicをクリックして、Talkを始めよう。</h2>
      )}
    </div>
  );
}
export default TalkMain;
