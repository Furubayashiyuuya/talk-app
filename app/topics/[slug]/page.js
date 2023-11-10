import React from "react";
import TalkApp from "../../content/TalkApp";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

import { pathmake } from "./posts";

export async function generateStaticParams() {
 return pathmake();
}



async function Page() {

  return (
    <TalkApp/>
  );
}

export default Page;
