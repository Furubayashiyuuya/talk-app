import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "./TalkMain.css";
import Pagination from "./Pagination";
import TalkSubmit from "./TalkSubmit";
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
      console.log(userDataArray);
      getOpenTopicIndex(index);
    });
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
    < TalkSubmit selectpas={selectpas} flg={topicswitch}/>
    </div>
  );
}
export default TalkMain;
