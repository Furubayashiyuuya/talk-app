import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/auth";
import "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { setSelectedTopic } from "../Redux/actions";
import database from "../../firebaseConfig";
function Templatebutton({ stampswitch, setMessageText }) {
  const [templateStamps, setTemplateStamps] = useState([]);
  const [isStampInitialized, setIsStampInitialized] = useState(false);

  useEffect(() => {
    if (stampswitch && !isStampInitialized) {
      const stampref = database.ref("Stamp/");
      stampref.on("value", (snapshot) => {
        const stamp = snapshot.val();
        const StampArray = Object.values(stamp);
        setTemplateStamps(StampArray);
      });
      setIsStampInitialized(!isStampInitialized);
    }
  }, [stampswitch, isStampInitialized]);
  return (
    <div className="template-menu">
      {templateStamps.map((templatestamp, index) => (
        <button
          key={index}
          className="stamp"
          onClick={() => setMessageText(templatestamp.text)}
        >
          {templatestamp.text}
        </button>
      ))}
      <br />
      <button className="close-button" onClick={() => stampswitch()}>
        閉じる
      </button>
    </div>
  );
}

export function useMainProcess() {
  const dispatch = useDispatch();

  const selectedTopicName = useSelector((state) => state.selectedTopic); // トピック名を設定
  let isTopicOpen = useSelector((state) => state.isTopicOpen); // 判定を設定

  const [messageName, setMessageName] = useState();
  const [messageText, setMessageText] = useState();
  const [fixedMessage, setFixedMessage] = useState(false);
  const [dataSubmit, setDataSubmit] = useState("");
  const [openTopicindex, getOpenTopicIndex] = useState(-1);
  const [messageData, getMessageData] = useState([]);
  const [isloading, setIsloding] = useState(true);
  //ページネーション
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedMessages = messageData.slice(startIndex, endIndex);
  const totalMessageCount = messageData.length - 3; // 先頭データがタイムスタンプとトピック名、タグ名であるため除いている
  const totalPageCount = Math.ceil(totalMessageCount / pageSize);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const Urltopiname = decodeURIComponent(usePathname());
  let ref;

  //URLでTopicを指定して開いているかの判定
  if (Urltopiname !== "/" && selectedTopicName === "") {
    ref = database.ref(`Talk/${Urltopiname}`);
    isTopicOpen = true;
  } else {
    ref = database.ref(`Talk/topics/${selectedTopicName}`);
  }

  const getMessages = () => {
    ref.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const userDataArray = Object.values(data);
        getMessageData(userDataArray); //topic直下のDBデータの取得
        
      }
    });
  };
  //入力データの追加
  const addData = () => {
    if (messageName.trim() === "" || messageText.trim() === "") {
      alert("未入力の項目があります。");
      return;
    }
    const data = {
      name: messageName,
      text: messageText,
    };
    ref.push(data);
    setMessageText("");
    getMessages();
  };
  //固定メッセージ
  const stampswitch = () => {
    if (fixedMessage === false) {
      setFixedMessage(true);
    } else {
      setFixedMessage(false);
    }
  };
  useEffect(() => {
    setIsloding(true);
    getMessages();
    setIsloding(false);
    return () => {
      ref.off("value");
    };
  }, [selectedTopicName]);
  return {
    setMessageName,
    setMessageText,
    addData,
    stampswitch,
    isloading,
    isTopicOpen,
    displayedMessages,
    totalPageCount,
    currentPage,
    handlePageChange,
    messageName,
    messageText,
    fixedMessage,
    dataSubmit,
    Templatebutton,
  };
}
