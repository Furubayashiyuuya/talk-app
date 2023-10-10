import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "./TalkMain.css";
import Pag from "./Pag";
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
  const [name, setName] = useState();
  const [text, setText] = useState();
  const [fixedtext, setFixedtext] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [getData, setGetData] = useState([]);
  const [openTopicindex, setOpenTopicIndex] = useState(-1);
  const [indata, setindata] = useState([]);
//ページネーション 
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const startIndex = (currentPage -1)* pageSize;
  const endIndex = startIndex + pageSize;
  const displayedData = indata.slice(startIndex,endIndex);
  const totalDataCount = indata.length - 2; // 先頭データがタイムスタンプとトピック名であるため除いている
  const totalPages = Math.ceil(totalDataCount / pageSize);
  const handlePageChange = (pageNumber) =>{
    setCurrentPage(pageNumber);
  }
  const GetMessages = (index) => {
    database.ref(`Talk/topics/${selectpas}`).on("value", function (snapshot) {
      const data = snapshot.val();
      const userDataArray = Object.values(data);
      setindata(userDataArray);//object形式を調べる
      setOpenTopicIndex(index);
    });
  };
  //入力データの追加
  const addData = () => {
    const data = {
      name: name,
      text: text,
    };
    database.ref(`Talk/topics/${selectpas}`).push(data);
    setText("");
    GetMessages();
  };
  //固定メッセージ
  const stampswich = () => {
    if (fixedtext === false) {
      setFixedtext(true);
    } else {
      setFixedtext(false);
    }
  };
  const Templatebutton = () =>{
    const templates = [
      "こんにちは",
      "よろしくお願いします。",
      "ありがとうございます。",
      "それな",
      "草",
      "wktk",
      "wwwww"
    ];
    return(
      <div className="template-menu">
        {templates.map((template,index) => (
          <button key={index} onClick={()=>setText(template)}>
            {template}
          </button>
        ))}
      <br />
      <button className="close-button" onClick={() => stampswich()}>
        閉じる
      </button>
    </div>
    )
  }
  useEffect(() => {
    GetMessages();
  }, [selectpas]);
  return (
    <div className="main">
        <ul>
          {topicswitch &&
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
        {topicswitch && <Pag totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange}/>}
        {topicswitch ? (
          //投稿レイアウト
          <div className="data-form">
            <label className="name-label">ユーザー名</label>
            <br />
            <input
              className="name-input"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label className="text-label">コメント</label>
            <br />
            <input
              className="text-input"
              type="text"
              name="text"
              maxLength="150"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <br />
            {!fixedtext ? (
              <button className="submit-button" onClick={() => addData(selectedTopic)}>
                送信
              </button>
            ) : (
              <></>
            )}
            {!fixedtext ? (
              <button className="template-button" onClick={() => stampswich()}>
                テンプレート
              </button>
            ) : (
              <></>
            )}
            {fixedtext ? (<Templatebutton />):(<></>)}
          </div>
        ) : (
          <h2>気になるTopicをクリックして、Talkを始めよう。</h2>
        )}
      </div>
  );
}
export default TalkMain;
