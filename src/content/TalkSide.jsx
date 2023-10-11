import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "./TalkSide.css";
import TalkMain from "./TalkMain";
function TalkSide() {
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
  const [getData, setGetData] = useState([]);
  const [topic, setTopic] = useState();
  const [selectedTopic, setSelectedTopic] = useState("");
  const [openTopicindex, setOpenTopicIndex] = useState(-1);
  const [openswitch, setOpenswitch] = useState(false);
  const [sortOption, setSortOption] = useState("make");

  //Side
  const sortData = (data) => {
    if (sortOption === "new") {
      return data.slice().sort((a, b) => b.timestamp - a.timestamp);
    }
    return data;
  };
  useEffect(() => {
    const ref = database.ref("Talk/topics");

    ref.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const userDataArray = sortData(Object.values(data));
        setGetData(userDataArray);
      } else {
        setGetData([]);
      }
    });
  }, [sortOption]);

  const addTopic = () => {
    if (!topic) {
      return;
    }
    const exising = getData.find((gets) => gets.topic === topic);
    //topic名チェック
    if (exising) {
      alert("同名のものがあります。");
      return;
    }

    const data = {
      topic: topic,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    };

    //タイムスタンプでトピックを更新

    const topicRef = database.ref(`Talk/topics/${topic}`);
    topicRef.set(data);

    setTopic("");
  };

  //side
  const open = (pas, index) => {
    database.ref(`Talk/topics/${pas}`).on("value", function (snapshot) {
      const data = snapshot.val();
      if (data) {
        setOpenswitch(true);
        setSelectedTopic(pas);
        setOpenTopicIndex(index);
      } else {
        setGetData([]);
        setSelectedTopic("");
        setOpenTopicIndex(-1);
      }
    });
  };

  return (
    <>
      <div className="side">
        <h2>Topic</h2>
        <div className="inputarea">
          <input
            className="side-input-name"
            type="text"
            name="topicname"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
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
              onClick={() => addTopic({ topic: topic })}
            >
              作成
            </button>
          </div>
        </div>
        <div className="side-items">
          {getData.map(
            (getdata, index) =>
              index !== getData.length && (
                <div
                  key={getdata.topic}
                  className={`topic-item ${
                    openTopicindex === index ? "selected" : ""
                  }`}
                  onClick={() => open(getdata.topic, index)}
                >
                  <li>{getdata.topic}</li>
                </div>
              ),
          )}
        </div>
      </div>
      <TalkMain selectpas={selectedTopic} flg={openswitch} />
    </>
  );
}
export default TalkSide;
