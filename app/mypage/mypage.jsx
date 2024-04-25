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

  const { loginmessage, db, uid, login, logout } =
    useLoginProcess();


  const [faviritetopics, setfaviritetopics] = useState([]);
  const [maketopics, setmaketopics] = useState([]);

  const logined = useSelector((state) => state.nowlogin);
  useEffect(() => {
    if (db && uid) {
      look();
    }
  }, [db, uid]);
  const look = () => {
    //お気に入り
    const collectionRef = collection(db, "Users", uid, "favirite");
    getDocs(collectionRef).then((res) => {
      const DBddta = res.docs.map((userdb) => {
        const usertext = userdb.data();
        return { ...usertext, id: userdb.id };
      });
      setfaviritetopics(DBddta);
    });
    
    //作成したもの
    const makecollectionRef = collection(db,"Users",uid,"Mytopics");
    getDocs(makecollectionRef).then((res) =>{
      const makeDBdata = res.docs.map((usermakedb)=>{
        const maketext = usermakedb.data();
        return {...maketext,id:usermakedb.id};
      })
      setmaketopics(makeDBdata);
    })
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

  const maketopicdelete = (id,topic) =>{
    const makecollectionRef = collection(db,"Users",uid,"Mytopics");
    const makeddeletetarget = doc(makecollectionRef,id);
    deleteDoc(makeddeletetarget).then(()=>{
      Realtimedelete(topic);
      faviritedelete(id)
      look();
    }).catch((err)=>{
      alert(err.message)
    });
  };
const Realtimedelete =(topic)=>{
  const targetrealtimedb = firebase.database().ref(`Talk/topics/${topic}`);
  targetrealtimedb.remove();
}

//ページネーション
const [currentPage,setCurrentPage] = useState(1);
const [itemsPerPage] = useState(5);
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;

// お気に入りのトピックと自作したトピックの配列をスライスして、現在のページのアイテムのみを表示します
const currentFavoriteTopics = faviritetopics.slice(indexOfFirstItem, indexOfLastItem);
const currentMakeTopics = maketopics.slice(indexOfFirstItem, indexOfLastItem);

// ページネーションロジック
const paginate = (pageNumber) => setCurrentPage(pageNumber);  

  return (
    <div className="mypage">
      <header>
        {logined ? <h1>{loginmessage}さんのpage</h1> : <h1>NologIn</h1>}
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
            <div className="favirete">
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
                {currentFavoriteTopics.map((data, index) => (
                  <tr key={data.text}>
                    <td>
                      <Link href={`/topics/${data.text}`}>{data.text}</Link>
                    </td>
                    <td>
                      {data.tag}
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
              <MyPagination
                itemsPerPage={itemsPerPage}
                totalItmes={faviritetopics.length}
                paginate={paginate}
                currentPage={currentPage}
                />
            </div>
            <div className="maked">
            <h2>自作したトピック</h2>
            <table className="faviritetable">
              <thead>
                <tr>
                  <th>Topic名</th>
                  <th>タグ名</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {currentMakeTopics.map((mydata) => (
                  <tr key={mydata.topic}>
                    <td>
                      <Link href={`/topics/${mydata.topic}`}>{mydata.topic}</Link>
                    </td>
                    <td>
                      {mydata.tag}
                    </td>
                    <td>
                    <button onClick={() => maketopicdelete(mydata.id,mydata.topic)}>
                        削除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <MyPagination
                itemsPerPage={itemsPerPage}
                totalItmes={maketopics.length}
                paginate={paginate}
                currentPage={currentPage}
                />
            </div>
          </>
        ) : null}
      </main>
    </div>
  );
}

const MyPagination =({itemsPerPage,totalItmes,paginate,currentPage})=>{
 const pageNumbers =[];

 for (let i=1;i<= Math.ceil(totalItmes / itemsPerPage);i++){
  pageNumbers.push(i);
 }

 return(
  <nav>
  <ul className="pagination">
    {pageNumbers.map((number) => (
      <li key={number} className={currentPage === number ? 'active' : null}>
        <a onClick={() => paginate(number)} >
          {number}
        </a>
      </li>
    ))}
  </ul>
</nav>
 );
}
export default Mypage;
