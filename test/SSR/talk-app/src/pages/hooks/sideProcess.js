import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import 'firebase/firestore';
import { useDispatch } from "react-redux";
import { setIsTopicOpen, setSelectedTopic } from "../Redux/actions"; 

export function useSideProcess() {
  const [topicData, setTopicData] = useState([]);
  const [topicName, setTopicName] = useState("");
  const [loading, setLoading] = useState(true);
  const [openTopicIndex, setOpenTopicIndex] = useState(-1);
  const [sortOption, setSortOption] = useState("make");
  const dispatch = useDispatch(); 
  const firebaseConfig = {
    apiKey: "AIzaSyCTz7WRVfaQergkV7Szr6gmVarhBHYCnpI",
    authDomain: "talk-95e0a.firebaseapp.com",
    projectId: "talk-95e0a",
    storageBucket: "talk-95e0a.appspot.com",
    messagingSenderId: "348990437531",
    appId: "1:348990437531:web:beb9f0e897cae19c322e3e" 
  
  };
  

      firebase.initializeApp(firebaseConfig);
    let database = firebase.database();
    
 const sortData = (data) => {
    if (sortOption === "new") {
      return data.slice().sort((a, b) => b.timestamp - a.timestamp);
    }
    return data;
  };
  const readTopic = ()=>{
    const ref = database.ref("Talk/topics");
    ref.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const userDataArray = sortData(Object.values(data));
        setTopicData(userDataArray);
      } else {
        setTopicData([]);
      }
      setLoading(false);
    });
}  
  useEffect(() => {
    setLoading(true);

    readTopic();
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

    const topicRef = firebase.database().ref(`Talk/topics/${topicName}`);
    topicRef.set(data);
    setTopicName("");
    readTopic();
  };
  //Side
  const open = (pas, index) => {
    firebase
      .database()
      .ref(`Talk/topics/${pas}`)
      .on("value", function (snapshot) {
        const data = snapshot.val();
        if (data) {
          dispatch(setIsTopicOpen(true));
          dispatch(setSelectedTopic(pas));
          setOpenTopicIndex(index);
        }
        //Topicが空の時エラー防止のために初期値を設定する
        if (!data) {
          setTopicData([]);
          dispatch(setSelectedTopic(""));
          setOpenTopicIndex(-1);
        }
      });
  };
  return {
    topicData,
    topicName,
    loading,
    setTopicName,
    addTopic,
    open,
    setSortOption,
  };
}
