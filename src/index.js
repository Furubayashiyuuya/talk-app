import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TalkApp from './content/TalkApp';
import reportWebVitals from './reportWebVitals';
import TalkSide from './content/TalkSide';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TalkApp />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();