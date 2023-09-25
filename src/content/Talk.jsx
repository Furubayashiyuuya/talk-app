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
  const [fixedtext,setFixedtext] = useState(false);
  const [indata,setindata] = useState([]); 
  const [sortOption,setSortOption] = useState('make');

const sortData = (data) =>{
  if(sortOption === 'new'){
    return data.slice().sort((a,b) => b.timestamp - a.timestamp);
  }else{
    return data;
  }
}
  useEffect(() =>{
    const ref = database.ref('Talk/topics');

    ref.on('value',(snapshot) => {
      const data = snapshot.val();
      if(data){
        const userDataArray = sortData(Object.values(data));
        setGetData(userDataArray);
      }else{
        setGetData([])
      }
    });
  },[sortOption]);

  const addTopic = () =>{
    if(!topic){
      return;
    }
    const exising = getData.find((gets) => gets.topic === topic);
    //topic名チェック
    if(exising){
      alert("同名のものがあります。");
      return;
    }

    const data = {
      topic:topic,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    }

    //タイムスタンプでトピックを更新
  
    const topicRef = database.ref(`Talk/topics/${topic}`);
    topicRef.set(data);

    setTopic('');
  }
//入力データの追加
  const addData = (pas) => {

    const data = {
      name:name,
      text:text
    };
    database.ref(`Talk/topics/${pas}`).push(data);
  }
//固定メッセージ
  const stampswich = ()=>{
    if (fixedtext === false ){
      setFixedtext(true)
    }else{
      setFixedtext(false)
    }
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
        <div className="talks">
          <ul>
          {openswitch && (
  indata.length > 0 ? (
    indata.map((indata, index) => {
      
      const datacheck = typeof indata === 'object' && 'name' in indata;

      return (
        datacheck ? (
          <div className="talkitem" key={index}>
            <li>
              ユーザー名: {indata.name}<br />
              {indata.text}
            </li>
          </div>
        ) : null
      );
    })
  ) : (
    <div className='talkstart'>
      <h2>Let's start Talking</h2>
    </div>
  )
)}
          </ul>
          
          {openswitch ?(
          //投稿レイアウト 
          <div className="typearea">
            <label className="namelabel">ユーザー名</label>
            <input className="nameinput" type="text" name="name" value={name}
            onChange={(e)=>setName(e.target.value)}/>
          <br />
            <label className="textlabel">コメント</label>
            <input className="textinput" type="text" name="text" maxLength="150" value={text}
            onChange={(e)=> setText(e.target.value)}/>
          <br />
          <button  onClick={() => addData(selectedTopic)}>送信</button>
          {!fixedtext?(
          <button onClick={()=>stampswich()}>チャット</button>
          ):(
            <></>
          )}
          {fixedtext ?(
            <div className="fixed">
             <button onClick={()=>setText("こんにちは")}>こんにちは</button>
             <button onClick={()=>setText("よろしくお願いします。")}>よろしくお願いします。</button>
             <button onClick={()=>setText("ありがとうございます。")}>ありがとうございます。</button>
             <button onClick={()=>setText("それな")}>それな</button>
             <button onClick={()=>setText("草")}>草</button>
             <button onClick={()=>setText("wktk")}>wktk</button>
             <button onClick={()=>setText("wwwww")}>wwwww</button>
             <br />
             <button className="closebtn" onClick={()=>stampswich()}>閉じる</button>
            </div>
          ):(
            <></>
          )}  
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
          <select name="select" id="select" onChange={(e) => setSortOption(e.target.value)}>
            <option value="make">作成順</option>
            <option value="new">新しい順</option>
          </select>
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