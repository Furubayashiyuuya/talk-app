"use client";

import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { useDispatch, useSelector } from "react-redux";
import { setOptionSwitch, setisClicked } from "../Redux/actions";

export function useStampcreateProcess() {
  const [newStampText, setNewStampText] = useState();
  const [existingStamps, setExistingStamps] = useState([]);

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
  useEffect(() => {
    templateget();
  }, [on]);
  var database = firebase.database();
  const templateget = () => {
    const stampref = database.ref("Stamp/");
    stampref.on("value", (snapshot) => {
      const stamp = snapshot.val();
      const StampArray = Object.values(stamp);
      setExistingStamps(StampArray);
    });
  };
  const templatecreateevent = () => {
    if (on === "start") {
      dispatch(setOptionSwitch("createtemplate"));
    } else {
      dispatch(setOptionSwitch("start"));
    }
    dispatch(setisClicked(!isClicked));
  };

  const createstamp = () => {
    //入力値のチェック
    const exeisnin = existingStamps.find((gets) => gets.text === newStampText);

    if (exeisnin) {
      alert("同名のものがあります。");
      return;
    }
    if (newStampText.trim() === "") {
      alert("文字を入力してください。");
      return;
    }
    const newstamp = {
      text: newStampText,
    };
    const stampref = database.ref(`Stamp/${newStampText}`);
    stampref.set(newstamp);
    setNewStampText("");
  };
  return {
    templatecreateevent,
    createstamp,
    existingStamps,
    newStampText,
    setNewStampText,
  };
}
