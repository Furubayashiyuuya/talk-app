import { SET_SELECTED_TOPIC, SET_IS_TOPIC_OPEN ,SET_OPTION_SWITCH,SET_IS_CLICKED} from "./actionTypes";

const initialState = {
  selectedTopic: "",
  isTopicOpen: false,
  optionswitch: "start",
  isClicked:false
};

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_TOPIC:
      return { ...state, selectedTopic: action.payload };
    case SET_IS_TOPIC_OPEN:
      return { ...state, isTopicOpen: action.payload };
    case SET_OPTION_SWITCH:
      return {...state,optionswitch: action.payload};
    case SET_IS_CLICKED:
      return {...state,isClicked:action.payload};  
    default:
      return state;
  }
}
export default rootReducer;
