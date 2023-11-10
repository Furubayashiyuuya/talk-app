import firebase from "firebase/compat/app";
import "firebase/compat/database";

export async function pathmake() {
  
  const posts = await fetch(`https://talk-95e0a-default-rtdb.firebaseio.com/Talk/topics.json`).then((res) => res.json());

  // JSON データからトピックの情報を配列として取得
  const topicsArray = Object.values(posts);
const params = topicsArray.map((topicData) => ({
    slug: topicData.topic,

}));
console.log(params);
return params;
}

export async function Pathset (params ) {
  const product = await fetch(`https://talk-95e0a-default-rtdb.firebaseio.com//Talk/topics.json`)
  return {
    props: { product },
  }
}