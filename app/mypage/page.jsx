"use client";

import React, { useState } from "react";
import { useLoginProcess } from "../hooks/loginProcess";
import { Provider } from "react-redux";
import store from "../Redux/store";
import Mypage from "./mypage";
function Home() {
  return (
    <Provider store={store}>
      <Mypage />
    </Provider>
  );
}
export default Home;
