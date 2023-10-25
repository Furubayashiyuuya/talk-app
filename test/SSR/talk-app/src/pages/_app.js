// pages/_app.js

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setIsTopicOpen, setSelectedTopic } from './Redux/actions';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

function MyApp({ Component, pageProps }) {
  // Firebaseの設定
  const firebaseConfig = {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    databaseURL: 'YOUR_DATABASE_URL',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID',
  };

  // Firebase アプリの初期化
    firebase.initializeApp(firebaseConfig);
   // ここに他のアプリの初期設定やコードを追加

  return <Component {...pageProps} />;
}

export default MyApp;
