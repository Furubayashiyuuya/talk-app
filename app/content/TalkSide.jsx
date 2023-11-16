"use client";

import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "./TalkSide.css";
import { setSelectedTopic, setIsTopicOpen } from "../Redux/actions";
import SidePagination from "./SidePagination";
import { useDispatch, useSelector } from "react-redux";
import { useSideProcess } from "../hooks/sideProcess";
import Link from "next/link";
import { useLoginProcess } from "../hooks/loginProcess";
import { useTagcreateProcess } from "../hooks/tagcreateProcess";

function TalkSide() {
  const {
    topicData,
    selectedTopicName,
    loading,
    setSelectedTopicName,
    addTopic,
    open,
    setSelectedSortOption,
    openTopicIndex,
    searchTopic,

    topicToShow,
    totalPages,
    currentPage,
    onPageChane,

    existingTag,
    tagget,
  } = useSideProcess();
  const { favirite } = useLoginProcess();

  const logined = useSelector((state) => state.nowlogin);
  return (
    <>
      <div className="side">
        <div className="side-Paginations">
          <SidePagination
            totalPageCount={totalPages}
            currentPage={currentPage}
            handlePageChange={onPageChane}
          />
        </div>
        <div>
          <h2 className="side-title">Topic</h2>
          <div className="inputarea">
            <input
              className="side-input-name"
              type="text"
              name="topicname"
              value={selectedTopicName}
              onChange={(e) => setSelectedTopicName(e.target.value)}
            />
            <h2 className="side-title">Tag</h2>
            <select
              className="topic-select"
              name="select"
              id="select"
              onClick={tagget}
            >
              <option selected>選択してください。</option>
              {existingTag.map((gettag) => (
                <option value={gettag.tag}>{gettag.tag}</option>
              ))}
            </select>
            <div className="side-select">
              <select
                className="topic-select"
                name="select"
                id="select"
                onChange={(e) => setSelectedSortOption(e.target.value)}
              >
                <option value="make" selected>
                  あいうえ順
                </option>
                <option value="new">新しい順</option>
              </select>
              <button
                className="topic-search-button"
                onClick={() => searchTopic({ topic: selectedTopicName })}
              >
                検索
              </button>
              <button
                className="topic-create-button"
                onClick={() => addTopic({ topic: selectedTopicName })}
              >
                作成
              </button>
            </div>
          </div>
          <div className="side-items">
            {loading ? (
              <div className="loading">Loading...</div>
            ) : (
              topicToShow.map(
                (getdata, index) =>
                  index !== topicToShow.length && (
                    <div
                      key={getdata.topic}
                      className={"topic-item"}
                      onClick={() => {
                        open(getdata.topic, index);
                      }}
                    >
                      <li>{getdata.topic}</li>
                      <li className="jump">
                        {logined ? (
                          <div onClick={() => favirite(getdata.topic)}>
                            お気に入り登録
                          </div>
                        ) : null}
                        <Link href={`/topics/${getdata.topic}`} target="_blank">
                          <p>別タブで開く</p>
                        </Link>
                      </li>
                    </div>
                  ),
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default TalkSide;
