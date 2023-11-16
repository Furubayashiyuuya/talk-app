"use client";

import React, { useState, useEffect } from "react";
import { useLoginProcess } from "../hooks/loginProcess";
import "./mypage.css";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";

import "firebase/compat/firestore";
import "firebase/compat/database";
function Mypage() {
  const { loginmessage, db, uid } = useLoginProcess();
  console.log(uid);

  const [faviritetopics, setfaviritetopics] = useState([]);
  useEffect(() => {
    if (db && uid) {
      look();
    }
  }, [db, uid]);
  const look = () => {
    const collectionRef = collection(db, "LoginDB", uid, "favirite");
    getDocs(collectionRef).then((res) => {
      const DBddta = res.docs.map((userdb) => {
        const usertext = userdb.data();
        return { ...usertext, id: userdb.id };
      });
      setfaviritetopics(DBddta);
    });
  };
  const faviritedelete = (id) => {
    const collectionRef = collection(db, "LoginDB", uid, "favirite");
    const deletetarget = doc(collectionRef, id);
    alert(id);
    deleteDoc(deletetarget)
      .then(() => {
        alert("削除しました。");
        // 削除後に再取得
        look();
        alert("end");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="mypage">
      <header>
        <h1>{loginmessage}page</h1>
        <h2 className="home">Home</h2>
        <h2>Log In</h2>
        <h2>Log Out</h2>
      </header>
      <main>
        <h2 onClick={look}>お気に入り</h2>
        {faviritetopics ? (
          <table className="faviritetable">
            <thead>
              <tr>
                <th>Topic名</th>
                <th>タグ名</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {faviritetopics.map((data, index) => (
                <tr key={index}>
                  <td>{data.text}</td>
                  <td>{data.tag}</td>
                  <td>
                    <button onClick={() => faviritedelete(data.id)}>
                      削除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </main>
    </div>
  );
}
export default Mypage;
