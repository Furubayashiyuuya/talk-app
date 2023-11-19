"use client";

import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { useDispatch, useSelector } from "react-redux";
import { setOptionSwitch, setisClicked } from "../Redux/actions";

export function useTagcreateProcess() {
  const [tagText, setTagText] = useState("");
  const [existingTag, setExistingTag] = useState([]);
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
useEffect (()=>{
  tagget();
},[on])
  const tagget = () => {
    const tagref = database.ref("Tag/");
    tagref.on("value", (snapshot) => {
      const tag = snapshot.val();
      const TagArray = Object.values(tag);
      setExistingTag(TagArray);
    });
  };

  const tagcreateevent = () => {
    if (on === "start") {
      dispatch(setOptionSwitch("createtag"));
    } else {
      dispatch(setOptionSwitch("start"));
    }
    dispatch(setisClicked(!isClicked));
  };
  const tagmake = () => {
    //入力値のチェック
    const exeisnin = existingTag.find((gets) => gets.tag === tagText);
    
    if (exeisnin) {
      alert("同名のものがあります。");
      return;
    }
    if (tagText.trim() === "") {
      alert("文字を入力してください。");
      return;
    }
    const newtag = {
      tag: tagText,
    };
    const tagref = database.ref(`Tag/${tagText}`);
    tagref.set(newtag);
    setTagText("");
    alert("作成完了しました。");
  };

  return {
    tagcreateevent,
    setTagText,
    tagText,
    tagmake,
    existingTag,
  };
}
