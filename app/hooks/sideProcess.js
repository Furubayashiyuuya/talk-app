"use client";

import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsTopicOpen,
  setSelectedTopic,
  setOptionSwitch,
  setisClicked,
} from "../Redux/actions";
import { initializeApp } from "firebase/app";
import database from "../../firebaseConfig";
import { useLoginProcess } from "./loginProcess";
import { addDoc, collection } from "firebase/firestore";

export function useSideProcess() {
  const [topicData, setTopicData] = useState([]);
  const [selectedTopicName, setSelectedTopicName] = useState("");
  const [loading, setLoading] = useState(true);
  const [openTopicIndex, setOpenTopicIndex] = useState(-1);
  const [selectedSortOption, setSelectedSortOption] = useState("make");
  const dispatch = useDispatch();

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(topicData.length / itemsPerPage);
  const starttopicIndex = (currentPage - 1) * itemsPerPage;
  const endtopicIndex = starttopicIndex + itemsPerPage;
  const topicToShow = topicData.slice(starttopicIndex, endtopicIndex);

  const [existingTag, setExistingTag] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");

 
  const {uid,loginmessage} = useLoginProcess();

  const onPageChane = (newPage) => {
    setCurrentPage(newPage);
  };
  const sortData = (data) => {
    if (selectedSortOption === "new") {
      return data.slice().sort((a, b) => b.timestamp - a.timestamp);
    }
    return data;
  };
  const readTopic = () => {
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
  };
  useEffect(() => {
    setLoading(true);
    readTopic();
  }, [selectedSortOption]);
  const addRealtime =()=>{
    if (!selectedTopicName) {
      return;
    }
    const exising = topicData.find((gets) => gets.topic === selectedTopicName);
    //topic名チェック
    if (exising) {
      alert("同名のものがあります。");
      return;
    }
    if (selectedTopicName.trim() === "") {
      alert("Topic名がありません。");
      return;
    }
    const tagValue = selectedTag || "defaultTag";
   
    const data = {
      topic: selectedTopicName,
      tag: tagValue,
      maker:uid,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    };

    //タイムスタンプでトピックを更新

    const topicRef = firebase
      .database()
      .ref(`Talk/topics/${selectedTopicName}`);
    topicRef.set(data);
    setSelectedTopicName("");
    readTopic();

    addclud(tagValue);
  }
  const addclud =(tagValue)=>{
    const db = firebase.firestore();
    const Ref = collection(db,"Users", uid, "Mytopics");
    
    addDoc(Ref,{
      topic:selectedTopicName,
      tag:tagValue,
      maker:uid
    }).then(()=>{
      alert("追加しました。");
    })
  }
  const addTopic = () => {
    addRealtime();
  };

  const searchTopic = () => {
    var query;
    const Ref = database.ref("Talk/topics");
    if (selectedTopicName.trim() === "" && selectedTag === "") {
      alert("search Topic名がありません。");
      return;
    }
    if (selectedTopicName.trim() !== "") {
      query = Ref.orderByChild("topic")
        .startAt(selectedTopicName)
        .endAt(selectedTopicName + "\uf8ff");
    } else if (selectedTopicName.trim() === "" && selectedTag !== "") {
      query = Ref.orderByChild("tag")
        .startAt(selectedTag)
        .endAt(selectedTag + "\uf8ff");
    }
    query.once("value").then((snapshot) => {
      const searchtopicResult = snapshot.val();
      if (searchtopicResult) {
        const resultArray = Object.values(searchtopicResult);
        setTopicData(resultArray);
      } else {
        setTopicData([]);
      }
    });
  };

  const open = (pas, index) => {
    
    firebase
      .database()
      .ref(`Talk/topics/${pas}`)
      .on("value", function (snapshot) {
        const data = snapshot.val();
        if (data) {
          const maker = data;
          dispatch(setIsTopicOpen(true));
          dispatch(setSelectedTopic(pas));
          
          //mainの機能を使用すると思われるので、head部分の機能を初期化しmainの邪魔にならないようにする
          dispatch(setOptionSwitch("start"));
          setOpenTopicIndex(index);
          // ループして全てのトピックから'selected'クラスを削除
          const items = document.querySelectorAll(".topic-item");
          items.forEach((item) => item.classList.remove("selected"));

          // クリックした要素に'selected'クラスを追加
          items[index].classList.add("selected");
          

        }

        //Topicが空の時エラー防止のために初期値を設定する
        if (!data) {
          setTopicData([]);
          dispatch(setSelectedTopic(""));
          setOpenTopicIndex(-1);
          console.log(`error`);
        }
      });
  
  };

  const tagget = () => {
    const tagref = database.ref("Tag/");
    tagref.on("value", (snapshot) => {
      const tag = snapshot.val();
      const TagArray = Object.values(tag);
      setExistingTag(TagArray);
    });

  };
  return {
    topicData,
    selectedTopicName,
    loading,
    setSelectedTopicName,
    addTopic,
    open,
    setSelectedSortOption,
    searchTopic,

    topicToShow,
    itemsPerPage,
    totalPages,
    currentPage,
    onPageChane,

    tagget,
    existingTag,
    setSelectedTag,
  };
}
