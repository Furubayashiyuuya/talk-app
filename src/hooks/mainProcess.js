import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { useDispatch } from "react-redux";
import { setIsTopicOpen, setSelectedTopic } from "../Redux/actions"; 
import { useSelector } from "react-redux";

function Templatebutton({ stampswich, setMessageText }) {
  const templates = [
    "こんにちは",
    "よろしくお願いします。",
    "ありがとうございます。",
    "それな",
    "草",
    "wktk",
    "wwwww",
    "乙",
    "gdgd",
    "kwsk",
    "おk",
    "おーおー 好き勝手やりなさる…！！",
    "あまり強い言葉を遣うなよ…弱く見えるぞ",
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
}


export function useMainProcess(){
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
      const topicname = useSelector((state) => state.selectedTopic); // トピック名を設定
      const isOpen = useSelector((state) => state.isTopicOpen); // 判定を設定
    
      const ref = database.ref(`Talk/topics/${topicname}`);
      const [messageName, setMessageName] = useState();
      const [messageText, setMessageText] = useState();
      const [fixedMessage, setFixedMessage] = useState(false);
      const [selectedTopic, setSelectedTopic] = useState("");
      const [openTopicindex, getOpenTopicIndex] = useState(-1);
      const [messageData, getMessageData] = useState([]);
      const [isloading, setIsloding] = useState(true);
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
        ref.on("value", (snapshot) => {
          const data = snapshot.val();
          const userDataArray = Object.values(data);
          getMessageData(userDataArray); //topic直下のDBデータの取得
          console.log(userDataArray);
          getOpenTopicIndex(index);
        });
      };
      //入力データの追加
      const addData = () => {
        const data = {
          name: messageName,
          text: messageText,
        };
        ref.push(data);
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
      useEffect(() => {
        setIsloding(true);
        getMessages();
        setIsloding(false);
        return () => {
          ref.off("value");
        };
      }, [topicname]);
 return{
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
 }   
}