// store.js
import { createStore } from "redux";
import rootReducer from "./reducers"; // 修正: rootReducerをデフォルトエクスポートしているため変更

const store = createStore(rootReducer);

export default store;
