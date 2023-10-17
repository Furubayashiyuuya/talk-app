import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "./TalkMain.css";
function TalkSubmit({ selectpas, flg }) {
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
  let topicname = selectpas;
  const [messageName, setMessageName] = useState();
  const [messageText, setMessageText] = useState();
  const [fixedMessage, setFixedMessage] = useState(false);
 // const [selectedTopic, setSelectedTopic] = useState("");
console.log(topicname)
  //入力データの追加
  const addData = () => {
    const data = {
      name: messageName,
      text: messageText,
    };
    database.ref(`Talk/topics/${topicname}`).push(data);
    setMessageText("");
  
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
  return (
    <div className="main">  
      
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
              onClick={() => addData()}
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
export default TalkSubmit;
