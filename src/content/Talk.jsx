import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import 'firebase/compat/database';
import './Talk.css';
function Talk (){
  const firebaseConfig = {
    apiKey: "AIzaSyCTz7WRVfaQergkV7Szr6gmVarhBHYCnpI",
    authDomain: "talk-95e0a.firebaseapp.com",
    databaseURL: "https://talk-95e0a-default-rtdb.firebaseio.com",
    projectId: "talk-95e0a",
    storageBucket: "talk-95e0a.appspot.com",
    messagingSenderId: "348990437531",
    appId: "1:348990437531:web:beb9f0e897cae19c322e3e"
  };
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();

  const [getData,setGetData] = useState([]);
  const [topic,setTopic] = useState();
  const [name,setName] = useState();
  const [text,setText] = useState();
  const [selectedTopic,setSelectedTopic] = useState('');
  const [openTopicindex,setOpenTopicIndex] = useState(-1);
  const [openswitch, setOpenswitch] = useState(false);
  const [indata,setindata] = useState([]); 

  useEffect (()=>{
    database.ref(`Talk/`).on('value', function(snapshot) {
      const data = snapshot.val();
      if (data) {
        const userDataArray = Object.values(data);
        setGetData(userDataArray);
      } else {
        setGetData([]);
      }
    });
  }, []);

  const addTopic = () =>{
    if(!topic){return}
    const exising = getData.find((gets) => gets.topic === topic);
    if(exising){
      alert("同名のものがあります。");
      return;
    }

    const data = {
      topic:topic
    }
    database.ref(`Talk`).push(data);
    database.ref(`Talk/topics/${topic}`).push(data);
  }

  const addData = (pas) => {
    const data = {
      name:name,
      text:text
    };
    database.ref(`Talk/topics/${pas}`).push(data);
  }

  const open = (pas,index) =>{
    database.ref(`Talk/topics/${pas}`).on('value', function(snapshot) {
      const data = snapshot.val();
      if (data) {
        const userDataArray = Object.values(data);
        setindata(userDataArray);
        setOpenswitch(true)
        setSelectedTopic(pas);
        setOpenTopicIndex(index)
      } else {
        setGetData([]);
        setindata(false);
        setSelectedTopic('');
        setOpenTopicIndex(-1);
      }
    });
  }
  
  
  return(
    <div className="talk">
      <div className='titlearea'>  
        <h1>Talking</h1>
      </div> 
      <div className="talkarea">
        <h2>内容</h2>
        <div className="talks">
          <ul>
            {openswitch &&(
              indata.length >1 ?(
                indata.map((indata,index) =>(
                index !== 0 && (
                  <div className="talkitem" key={index}>
                    <li>ユーザー名:{indata.name}<br />
                    {indata.text}</li>
                  </div>
                )
                ))
              ):(
                <div className='talkstart'>
                  <h2>Let's start Talking</h2>
                </div>
              )
            )
            }
          </ul>
          {openswitch ?(
          <div className="typearea">
            <label>ユーザー名</label>
            <input type="text" name="name" value={name}
            onChange={(e)=>setName(e.target.value)}/>
          <br />
            <label>コメント</label>
            <input className="textinput" type="text" name="text" value={text}
            onChange={(e)=> setText(e.target.value)}/>
          <br />
            <button onClick={() => addData(selectedTopic)}>送信</button>  
          </div>
          ):(
            <h2>
              openボタンを推して、Talkを始めよう。
            </h2>
          )}

        </div>
      </div>
      <div className="sidemenew">
        <h2>Topic</h2>
        <div className="inputarea">
          <input type="text" name="topicname" value={topic} onChange={(e)=> setTopic(e.target.value)}/>
          <button onClick={()=>addTopic({topic:topic})}>作成</button>
        </div>
        <div className="sideitem">
          {getData.map((getdata,index)=>(
            index !== getData.length-1 &&(
              <div key={getdata.topic} className={`side ${openTopicindex === index ? 'selected': ''}`}>
                <li>{getdata.topic}</li>
                <li><button onClick={() => open(getdata.topic,index) }>open</button></li>
              </div>
            )
          ))}
        </div>
        </div>  
    </div>
 )
}
export default Talk