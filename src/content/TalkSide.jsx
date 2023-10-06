import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "./TalkSide.css";
import TalkMain from "./TalkMain";
function TalkSide() {
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
      <div className="sidemenew">
        <h2>Topic</h2>
        <div className="inputarea">
          <input
            type="text"
            name="topicname"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <div className="topicact">
            <select
              name="select"
              id="select"
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="new">新しい順</option>
              <option value="make">あいうえ順</option>
            </select>
            <button
              className="topicbtn"
              onClick={() => addTopic({ topic: topic })}
            >
              作成
            </button>
          </div>
        </div>
        <div className="sideitem">
          {getData.map(
            (getdata, index) =>
              index !== getData.length && (
                <div
                  key={getdata.topic}
                  className={`side ${
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
