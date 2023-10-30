"use client";

import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { useDispatch } from "react-redux";
import { setIsTopicOpen, setSelectedTopic } from "../Redux/actions"; 
import {initializeApp} from "firebase/app"; 

export function useSideProcess() {
  const [topicData, setTopicData] = useState([]);
  const [topicName, setTopicName] = useState("");
  const [loading, setLoading] = useState(true);
  const [openTopicIndex, setOpenTopicIndex] = useState(-1);
  const [sortOption, setSortOption] = useState("make");
  const dispatch = useDispatch(); 
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_APP_ID
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
        console.log(userDataArray);
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
          console.log(openTopicIndex);
                    // ループして全てのトピックから'selected'クラスを削除
                    const items = document.querySelectorAll('.topic-item');
                    items.forEach(item => item.classList.remove('selected'));
          
                    // クリックした要素に'selected'クラスを追加
                    items[index].classList.add('selected');
        }
        //Topicが空の時エラー防止のために初期値を設定する
        else {
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
