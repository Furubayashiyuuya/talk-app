import { SET_SELECTED_TOPIC, SET_IS_TOPIC_OPEN,SET_OPTION_SWITCH,SET_IS_CLICKED } from "./actionTypes";

export const setSelectedTopic = (topic) => ({
  type: SET_SELECTED_TOPIC,
  payload: topic,
});

export const setIsTopicOpen = (isOpen) => ({
  type: SET_IS_TOPIC_OPEN,
  payload: isOpen,
});

export const setOptionSwitch = (optionswitch) => ({
  type: SET_OPTION_SWITCH,
  payload: optionswitch,
});

export const setisClicked = (isClicked) => ({
  type: SET_IS_CLICKED,
  payload:isClicked,
});