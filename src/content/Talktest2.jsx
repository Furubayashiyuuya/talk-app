import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "./TalkApp.css";
function Talktest2({ selectpas,flg }) {
  const firebaseConfig = {
    apiKey: "AIzaSyCTz7WRVfaQergkV7Szr6gmVarhBHYCnpI",
    authDomain: "talk-95e0a.firebaseapp.com",
    databaseURL: "https://talk-95e0a-default-rtdb.firebaseio.com",
    projectId: "talk-95e0a",
    storageBucket: "talk-95e0a.appspot.com",
    messagingSenderId: "348990437531",
    appId: "1:348990437531:web:beb9f0e897cae19c322e3e",
  };
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();

  const pas = selectpas;  
  const topicswitch = flg;
  const [name, setName] = useState();
  const [text, setText] = useState();
  const [fixedtext, setFixedtext] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [getData, setGetData] = useState([]);
  const [openTopicindex, setOpenTopicIndex] = useState(-1);
  const [indata, setindata] = useState([]);

const dataget=( index)=>{
  database.ref(`Talk/topics/${selectpas}`).on("value", function (snapshot) {
    const data = snapshot.val();
    
      const userDataArray = Object.values(data);
      setindata(userDataArray);
      setOpenTopicIndex(index);
  });
}
  //入力データの追加
  const addData = () => {
    const data = {
      name: name,
      text: text,
    };
    database.ref(`Talk/topics/${selectpas}`).push(data);
    setText("");
  };
  //固定メッセージ
  const stampswich = () => {
    if (fixedtext === false) {
      setFixedtext(true);
    } else {
      setFixedtext(false);
    }
  };
useEffect(()=>{
  dataget();
},[selectpas])
  return (
    <>
          <ul>
            {topicswitch &&
              (indata.length > 2 ? (
                indata.map((indata, index) => {
                  const datacheck =
                    typeof indata === "object" && "name" in indata;

                  return datacheck ? (
                    <div className="talkitem" key={index}>
                        <li className="username">ユーザー名: {indata.name}</li>
                        <li className="usertext">{indata.text}</li>
                    </div>
                  ) : null;
                })
              ) : (
                <div className="talkstart">
                  <h2>Let's start Talking</h2>
                </div>
              ))}
          </ul>
          {topicswitch ? (
            //投稿レイアウト
            <div className="typearea">
              <label className="namelabel">ユーザー名</label>
              <br />
              <input
                className="nameinput"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <label className="textlabel">コメント</label>
              <br />
              <input
                className="textinput"
                type="text"
                name="text"
                maxLength="150"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <br />
              {!fixedtext ? (
                <button className="subbtn" onClick={() => addData(selectedTopic)}>
                  送信
                </button>
              ) : (
                <></>
              )}
              {!fixedtext ? (
                <button className="tembtn" onClick={() => stampswich()}>
                  テンプレート
                </button>
              ) : (
                <></>
              )}
              {fixedtext ? (
                <div className="fixed">
                  <button onClick={() => setText("こんにちは")}>
                    こんにちは
                  </button>
                  <button onClick={() => setText("よろしくお願いします。")}>
                    よろしくお願いします。
                  </button>
                  <button onClick={() => setText("ありがとうございます。")}>
                    ありがとうございます。
                  </button>
                  <button onClick={() => setText("それな")}>それな</button>
                  <button onClick={() => setText("草")}>草</button>
                  <button onClick={() => setText("wktk")}>wktk</button>
                  <button onClick={() => setText("wwwww")}>wwwww</button>
                  <br />
                  <button className="closebtn" onClick={() => stampswich()}>
                    閉じる
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <h2>気になるTopicをクリックして、Talkを始めよう。</h2>
          )}
    </>
  );
}
export default Talktest2;
