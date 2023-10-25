import TalkApp from './content/TalkApp';
import React from 'react';
import { Provider } from 'react-redux';
import store from './Redux/store';
export default function Home() {
  return (
    <Provider store={store}>
    <TalkApp />
  </Provider>
  )
}
