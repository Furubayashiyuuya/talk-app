"use client";

import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { useDispatch, useSelector } from "react-redux";
import { setOptionSwitch, setisClicked } from "../Redux/actions";

export function useHeadProcess() {
  const [exeisningtopics, setexeisningtopics] = useState([]);
  const [searchword, setsearchword] = useState();
  const [targettopic, settargettopic] = useState();
  const [result, setresult] = useState([]);
  const [newstamptext, setnewstamptext] = useState();
  const [exeisningstamps, setexeisningstamps] = useState([]);

  const dispatch = useDispatch();
  const on = useSelector((state) => state.optionswitch);
  const isClicked = useSelector((state) => state.isClicked);
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
  var database = firebase.database();

  const searchevent = () => {
    if (on === "start") {
      dispatch(setOptionSwitch("search"));
      const ref = database.ref("Talk/topics");
      ref.on("value", (snapshot) => {
        const data = snapshot.val();
        const userDataArray = Object.values(data);
        setexeisningtopics(userDataArray);
      });
    } else {
      dispatch(setOptionSwitch("start"));
    }
    dispatch(setisClicked(!isClicked));
  };
  const createtemplateevent = () => {
    if (on === "start") {
      dispatch(setOptionSwitch("createtemplate"));
      const stampref = database.ref("Stamp/");
      stampref.on("value", (snapshot) => {
        const stamp = snapshot.val();
        const StampArray = Object.values(stamp);
        setexeisningstamps(StampArray);
        console.log(exeisningstamps);
      });
    } else {
      dispatch(setOptionSwitch("start"));
    }
    dispatch(setisClicked(!isClicked));
  };
  const targetevent = () => {
    const messagesRef = database.ref(`Talk/topics/${targettopic}`);
if(searchword.trim() === "") {
  alert("文字を入力してください。");
  return;
}
    // 名前が条件に一致するデータを取得するクエリ
    const query = messagesRef.orderByChild("name").equalTo(searchword);
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
          setresult(resultArray);
        });
      } else {
        setresult([]);
      }
    });
  };

  const createstamp = () => {
    //入力値のチェック
    const exeisnin = exeisningstamps.find((gets) => gets.text === newstamptext);

    if (exeisnin) {
      alert("同名のものがあります。");
      return;
    }
    if (newstamptext.trim() === "") {
      alert("文字を入力してください。");
      return;
    }
    const newstamp = {
      text: newstamptext,
    };
    const stampref = database.ref(`Stamp/${newstamptext}`);
    stampref.set(newstamp);
    setnewstamptext("");
  };
  return {
    searchevent,
    createtemplateevent,
    targetevent,
    createstamp,
    targettopic,
    settargettopic,
    exeisningtopics,
    exeisningstamps,
    searchword,
    setsearchword,
    result,
    newstamptext,
    setnewstamptext,
    isClicked
  };
}
