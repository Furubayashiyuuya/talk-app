import {
  SET_SELECTED_TOPIC,
  SET_IS_TOPIC_OPEN,
  SET_OPTION_SWITCH,
  SET_IS_CLICKED,
  SET_NOW_LOGIN,
} from "./actionTypes";

export const setSelectedTopic = (topic) => ({
  type: SET_SELECTED_TOPIC,
  payload: topic,
});

export const setIsTopicOpen = (isTopicOpen) => ({
  type: SET_IS_TOPIC_OPEN,
  payload: isTopicOpen,
});

export const setOptionSwitch = (optionswitch) => ({
  type: SET_OPTION_SWITCH,
  payload: optionswitch,
});

export const setisClicked = (isClicked) => ({
  type: SET_IS_CLICKED,
  payload: isClicked,
});

export const setNowlogin = (nowlogin) => ({
  type: SET_NOW_LOGIN,
  payload: nowlogin,
});
