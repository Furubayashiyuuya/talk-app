"use client";

import React, { useState } from "react";
import { useLoginProcess } from "../hooks/loginProcess";
import "./mypage.css";
function Mypage() {
    const {
        loginmessage
    } = useLoginProcess();
  return (
    <div className="mypage">
    <h1>{loginmessage}page</h1>
    <header>
    <h2 className="home">home</h2>
    <h2>Log In</h2>
    <h2>Log Out</h2>
    </header>

    </div>
  );
}
export default Mypage;
