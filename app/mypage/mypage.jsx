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
import Link from "next/link";
import { useSelector } from "react-redux";

import 'firebase/compat/storage';
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
  let database = firebase.database();
  var storage = firebase.storage();
  const [image, setImage] = useState(null);
  const [title,settitle] = useState();
  const [text,settext] = useState();

  const { loginmessage, db, uid, login, logout } = useLoginProcess();
  console.log(uid);

  const [faviritetopics, setfaviritetopics] = useState([]);
  const logined = useSelector((state) => state.nowlogin);
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
        look();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // データを追加
  const addData = (data) => {
    database.ref(`${uid}/item/`).push(data);
    alert("データを追加しました。");
    };
//
  // 画像をアップロードする関数
  const uploadImage = () => {
    if (image) {
      const storageRef = storage.ref(`${uid}/items`);
      const imageRef = storageRef.child(image.name);

      imageRef.put(image).then(() => {
        // 画像のアップロードが完了したら、そのURLを含むデータを追加
        const data = { title: title, text: text, imageUrl: imageRef.fullPath };
        addData(data);
        setImage(null);
        settitle('');
        settext('');
      });
    }
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
          <button onClick={logout}>Log Out</button>
        </h2>
      </header>
      <main>
        {logined ? (
          <>
<div className="imgup">
  <div className="title">
<label>title</label>
      <input 
        type='text'
        name='title'
        value={title} 
        onChange={(e) => settitle(e.target.value)} />
  </div>
  <div className="text">
      <label>text</label>
      <input
        type='text'
        name='text'
        value={text}       
        onChange={(e) => settext(e.target.value)} />
<input 
      type="file" 
      onChange={(e) => setImage(e.target.files[0])} 
      />
   </div>   
  <button onClick={uploadImage}>画像をアップロード</button>
</div>

            <h2>お気に入り</h2>
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
                    <td>
                      <Link href={`/topics/${data.text}`}>{data.text}</Link>
                    </td>
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
          </>
        ) : null}
      </main>
    </div>
  );
}
export default Mypage;
