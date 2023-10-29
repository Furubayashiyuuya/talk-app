import { SET_SELECTED_TOPIC, SET_IS_TOPIC_OPEN } from "./actionTypes";

const initialState = {
  selectedTopic: "",
  isTopicOpen: false,
};

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_TOPIC:
      return { ...state, selectedTopic: action.payload };
    case SET_IS_TOPIC_OPEN:
      return { ...state, isTopicOpen: action.payload };
    default:
      return state;
  }
}
export default rootReducer;
