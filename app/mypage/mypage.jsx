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
  let database = firebase.database();
  var storage = firebase.storage();
  const [image, setImage] = useState(null);
  const [title, settitle] = useState();
  const [text, settext] = useState();

  const { loginmessage, db, uid, login, logout, guestlogin } =
    useLoginProcess();
  console.log(uid);

  const [faviritetopics, setfaviritetopics] = useState([]);

  const [userimges, setuserimges] = useState([]);

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

  // 画像をアップロードする関数
  const uploadImage = () => {
    if (image) {
      const storageRef = storage.ref(`${uid}`);
      const imageRef = storageRef.child(image.name);

      imageRef.put(image).then(() => {
        // 画像のアップロードが完了したら、そのURLを含むデータを追加

        const Ref = collection(db, "LoginDB", uid, "img");
        addDoc(Ref, {
          title: title,
          text: text,
          imageUrl: image.name,
        });
        alert("データを追加しました。");
        setImage(null);
        settitle("");
        settext("");
        imglook();
      });
    }
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

  const imglook = () => {
    const collectionImgRef = collection(db, "LoginDB", uid, "img");
    getDocs(collectionImgRef).then((res) => {
      const ImgData = res.docs.map((userimg) => {
        const imgdata = userimg.data();
        return { ...imgdata };
      });
      console.log(ImgData);
      setuserimges(ImgData);
      console.log(userimges);
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
            <div className="imgup">
              <div className="title">
                <label>title</label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => settitle(e.target.value)}
                />
              </div>
              <div className="text">
                <label>text</label>
                <input
                  type="text"
                  name="text"
                  value={text}
                  onChange={(e) => settext(e.target.value)}
                />
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <button onClick={uploadImage}>画像をアップロード</button>
              <br />
              <button onClick={imglook}>ImgLook</button>
            </div>
            <p>{uid}</p>
            <div className="imgdisplay">
              {userimges.map((img, index) => (
                <div key={index}>
                  <h3>{img.title}</h3>
                  <img
                    src={`https://firebasestorage.googleapis.com/v0/b/talk-95e0a.appspot.com/o/${uid}%2F${encodeURIComponent(
                      img.imageUrl,
                    )}?alt=media`}
                    alt={img.imageUrl}
                  />
                  <p>[本文]</p>
                  <p>{img.text}</p>
                </div>
              ))}
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
