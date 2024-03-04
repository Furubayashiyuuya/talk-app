"use client";

import React, { useState, useEffect } from "react";
import { useLoginProcess } from "../hooks/loginProcess";
import "./mypage.css";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";

import "firebase/compat/firestore";
import "firebase/compat/database";
import Link from "next/link";
import { useSelector } from "react-redux";

import "firebase/compat/storage";
import firebase from "firebase/compat/app";

function Mypage() {
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

  const { loginmessage, db, uid, login, logout, guestlogin } =
    useLoginProcess();
  console.log(uid);

  const [faviritetopics, setfaviritetopics] = useState([]);


  const logined = useSelector((state) => state.nowlogin);
  useEffect(() => {
    if (db && uid) {
      look();
    }
  }, [db, uid]);
  const look = () => {
    const collectionRef = collection(db, "Users", uid, "favirite");
    getDocs(collectionRef).then((res) => {
      const DBddta = res.docs.map((userdb) => {
        const usertext = userdb.data();
        return { ...usertext, id: userdb.id };
      });
      setfaviritetopics(DBddta);
    });
  };


  const faviritedelete = (id) => {
    const collectionRef = collection(db, "Users", uid, "favirite");
    const deletetarget = doc(collectionRef, id);
    deleteDoc(deletetarget)
      .then(() => {
        look();
      })
      .catch((err) => {
        alert(err.message);
      });
  };


  return (
    <div className="mypage">
      <header>
        {logined ? <h1>{loginmessage}page</h1> : <h1>NologIn</h1>}
        <h2 className="home">
          <Link href="./">Home</Link>
        </h2>
        <h2>
          <button onClick={login}>Log In</button>
        </h2>
        <h2>
          <button onClick={guestlogin}>Guest Log In</button>
        </h2>
        <h2>
          <button onClick={logout}>Log Out</button>
        </h2>
      </header>
      <main>
        {logined ? (
          <>
            <h2>お気に入り</h2>
            <table className="faviritetable">
              <thead>
                <tr>
                  <th>Topic名</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {faviritetopics.map((data, index) => (
                  <tr key={data.text}>
                    <td>
                      <Link href={`/topics/${data.text}`}>{data.text}</Link>
                    </td>
                    <td>
                      <button onClick={() => faviritedelete(data.id)}>
                        削除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : null}
      </main>
    </div>
  );
}
export default Mypage;
