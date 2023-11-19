"use client";

import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { useDispatch, useSelector } from "react-redux";
import { setOptionSwitch, setisClicked } from "../Redux/actions";

export function useSearchProcess() {
  const [existingTopics, setExistingTopics] = useState([]);
  const [searchWord, setSearchWord] = useState();
  const [targetTopic, setTargetTopic] = useState();
  const [searchResult, setSearchResult] = useState([]);

  const dispatch = useDispatch();
  const on = useSelector((state) => state.optionswitch);
  const isClicked = useSelector((state) => state.isClicked);
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId:
      process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_APP_ID,
  };
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
useEffect(()=>{
  getsearchtopic();
},[on])
const getsearchtopic = () =>{
  const ref = database.ref("Talk/topics");
  ref.on("value", (snapshot) => {
    const data = snapshot.val();
    const userDataArray = Object.values(data);
    setExistingTopics(userDataArray);
  });
}
  const searchevent = () => {
    if (on === "start") {
      dispatch(setOptionSwitch("search"));
    } else {
      dispatch(setOptionSwitch("start"));
    }
    dispatch(setisClicked(!isClicked));
  };

  const targetevent = () => {
    const messagesRef = database.ref(`Talk/topics/${targetTopic}`);
    if (searchWord.trim() === "") {
      alert("文字を入力してください。");
      return;
    }
    // 名前が条件に一致するデータを取得するクエリ
    const query = messagesRef
      .orderByChild("name")
      .startAt(searchWord)
      .endAt(searchWord + "\uf8ff");
    //クエリ実行
    query.once("value").then((snapshot) => {
      const searchResults = snapshot.val();
      if (searchResults) {
        // 条件に一致するデータを処理
        Object.keys(searchResults).forEach((key) => {
          const resultArray = Object.keys(searchResults).map((key) => ({
            id: key,
            name: searchResults[key].name,
            text: searchResults[key].text,
          }));
          setSearchResult(resultArray);
        });
      } else {
        setSearchResult([]);
      }
    });
  };

  return {
    searchevent,
    targetevent,
    targetTopic,
    setTargetTopic,
    existingTopics,
    searchWord,
    setSearchWord,
    searchResult,
  };
}
