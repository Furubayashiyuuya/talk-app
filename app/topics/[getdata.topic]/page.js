
import React from "react";
import { useNavigation } from "next/navigation";
import TalkMain from "../../content/TalkMain";
import TalkSide from "../../content/TalkSide";
import { Provider } from "react-redux";
import store from "../../Redux/store";

export default function TopicDetail() {
  const navigation = useNavigation();
  const { topicName } = navigation.query;
  if (!topicName) {
    return <div>Loading...</div>; // または他の処理を記述
  }

  return (
    <>
      <h1>aaaa</h1>
      <p>選択したトピック名: {topicName}</p>
    </>  
  );
}
