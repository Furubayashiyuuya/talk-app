"use client";

import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { useDispatch, useSelector } from "react-redux";
import { setOptionSwitch, setisClicked } from "../Redux/actions";
import database from "../../firebaseConfig";
export function useSearchProcess() {
  const [existingTopics, setExistingTopics] = useState([]);
  const [searchWord, setSearchWord] = useState();
  const [targetTopic, setTargetTopic] = useState();
  const [searchResult, setSearchResult] = useState([]);

  const dispatch = useDispatch();
  const on = useSelector((state) => state.optionswitch);
  const isClicked = useSelector((state) => state.isClicked);

  useEffect(() => {
    getsearchtopic();
  }, [on]);
  const getsearchtopic = () => {
    const ref = database.ref("Talk/topics");
    ref.on("value", (snapshot) => {
      const data = snapshot.val();
      const userDataArray = Object.values(data);
      setExistingTopics(userDataArray);
    });
  };
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
