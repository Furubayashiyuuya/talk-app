import React from "react";
import "firebase/compat/database";
import "./TalkHead.css";
import { useSelector } from "react-redux";
import { useLoginProcess } from "../hooks/loginProcess";

import Link from "next/link";
import Search from "./Head/Search";
import CreateTemplate from "./Head/CreateTemplate";
import CreateTag from "./Head/CreateTag";
import { useSearchProcess } from "../hooks/searchProcess";
import { useStampcreateProcess } from "../hooks/stampcreateProcess";
import { useTagcreateProcess } from "../hooks/tagcreateProcess";
function TalkHead() {
  const {
    searchevent
  } = useSearchProcess();
  const {
    templatecreateevent,
    
  } = useStampcreateProcess();
  const { tagcreateevent } =
  useTagcreateProcess();
  const { login, loginmessage, logout } = useLoginProcess();
  const on = useSelector((state) => state.optionswitch);
  const logined = useSelector((state) => state.nowlogin);
  return (
    <>
      <div className="title">
        <h1>Talk</h1>
        {logined ? (
          <button className="username">
            <Link href="../mypage">{loginmessage}さん</Link>
          </button>
        ) : null}
        </div>
      <div className="option">
        <div className="optinbuttons">
         {!logined ? <button className="action" onClick={login}>Log In</button> : null}
        {logined ? <button className="action" onClick={logout}>Log Out</button> : null}
       
        <button
          className={`action ${on === "search" ? "clicked" : ""}`}
          onClick={searchevent}
        >
          Search
        </button>
        <button
          className={`action ${on === "createtemplate" ? "clicked" : ""}`}
          onClick={templatecreateevent}
        >
          CreateTemplate
        </button>
        
        <button
          className={`action ${on === "createtag" ? "clicked" : ""}`}
          onClick={tagcreateevent}
        >
          CreateTag
        </button>
        
        </div> 
           <Search />
           <CreateTemplate />
            <CreateTag />
      </div>
    </>
  );
}

export default TalkHead;
