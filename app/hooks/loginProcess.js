"use client";

import React, { useState, useEffect, use } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { useDispatch, useSelector } from "react-redux";
import { setNowlogin, setOptionSwitch, setisClicked } from "../Redux/actions";
import {addDoc, collection, getDoc}from "firebase/firestore";
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import 'firebase/compat/firestore';
export function useLoginProcess() {
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
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = getAuth(app);
  const Provider = new GoogleAuthProvider();
  const [loginmessage,setLoginmessage] = useState();
  const [uid,setUid] = useState();

  const [faviritetopics,setfaviritetopics] = useState([]);
  const dispatch = useDispatch();

  useEffect(() =>{
    const unsubscride = onAuthStateChanged(auth,(user) =>{
      if(user){
        setLoginmessage(user.displayName);
        setUid(user.uid);
        dispatch(setNowlogin(true));
      }

      return () => unsubscride();
    })
  },[])


  const login = () =>{
    signInWithPopup(auth,Provider).then((result) => {
      setLoginmessage(result.user.displayName);
      setUid(result.user.uid);
      dispatch(setNowlogin(true));
    })
  }
const logout =() =>{
  signOut(auth);
  setLoginmessage();
  dispatch(setNowlogin(false));
}

const favirite = (topicname) =>{
const Ref = collection(db, 'LoginDB',uid,'favirite');
addDoc(Ref,{
  text:  topicname
}).then(()=>{
  alert("ok");
})

}

const faviriteview = async () => {
  try {
    const Ref = collection(db, 'LoginDB', uid, 'favirite');
    const res = await getDoc(Ref);
    const favirites = res.docs.map((userfaverit) => {
      const faviritetopic = userfaverit.data();
      return { ...faviritetopic };
    });
    setfaviritetopics(favirites);
    console.log(favirites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
  }
};
  return{
    login,
    loginmessage,
    logout,
    db,
    uid,
    favirite,
  }
}
