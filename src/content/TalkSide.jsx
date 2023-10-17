import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "./TalkSide.css";
import { setSelectedTopic, setIsTopicOpen } from "./actions";
import { useDispatch } from "react-redux";

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
  const [topicData, setTopicData] = useState([]);
  const [topicName, settopicName] = useState();
  const [openTopicindex, setOpenTopicIndex] = useState(-1);
  const [sortOption, setSortOption] = useState("make");

  const dispatch = useDispatch();

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
        setTopicData(userDataArray);
        console.log(userDataArray);
      } else {
        setTopicData([]);
      }
    });
  }, [sortOption]);

  const addTopic = () => {
    if (!topicName) {
      return;
    }
    const exising = topicData.find((gets) => gets.topic === topicName);
    //topic名チェック
    if (exising) {
      alert("同名のものがあります。");
      return;
    }

    const data = {
      topic: topicName,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    };

    //タイムスタンプでトピックを更新

    const topicRef = database.ref(`Talk/topics/${topicName}`);
    topicRef.set(data);

    settopicName("");
  };

  //side
  const open = (pas, index) => {
    database.ref(`Talk/topics/${pas}`).on("value", function (snapshot) {
      const data = snapshot.val();
      if (data) {
        dispatch(setIsTopicOpen(true));
        dispatch(setSelectedTopic(pas));
        setOpenTopicIndex(index);
      } else {
        setTopicData([]);
        dispatch(setSelectedTopic(""));
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
            value={topicName}
            onChange={(e) => settopicName(e.target.value)}
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
              onClick={() => addTopic({ topic: topicName })}
            >
              作成
            </button>
          </div>
        </div>
        <div className="side-items">
          {topicData.map(
            (getdata, index) =>
              index !== topicData.length && (
                <div
                  key={getdata.topic}
                  className={`topic-item ${
                    openTopicindex === index ? "selected" : ""
                  }`}
                  onClick={() => {
                    open(getdata.topic, index);
                  }}
                >
                  <li>{getdata.topic}</li>
                </div>
              ),
          )}
        </div>
      </div>
    </>
  );
}
export default TalkSide;
