import { SET_SELECTED_TOPIC, SET_IS_TOPIC_OPEN } from "./actionTypes";

export const setSelectedTopic = (topic) => ({
  type: SET_SELECTED_TOPIC,
  payload: topic,
});

export const setIsTopicOpen = (isOpen) => ({
  type: SET_IS_TOPIC_OPEN,
  payload: isOpen,
});
