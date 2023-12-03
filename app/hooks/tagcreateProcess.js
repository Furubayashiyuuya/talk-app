"use client";

import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { useDispatch, useSelector } from "react-redux";
import { setOptionSwitch, setisClicked } from "../Redux/actions";
import database from "../../firebaseConfig";
export function useTagcreateProcess() {
  const [tagText, setTagText] = useState("");
  const [existingTag, setExistingTag] = useState([]);
  const dispatch = useDispatch();
  const on = useSelector((state) => state.optionswitch);
  const isClicked = useSelector((state) => state.isClicked);
  useEffect(() => {
    tagget();
  }, [on]);
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
