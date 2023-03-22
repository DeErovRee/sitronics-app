export const ADD_MESSAGE = "MESSAGES::ADD_MESAGE";

export const addMessage = (chatId, message, timeStamp, author) => ({
  type: ADD_MESSAGE,
  chatId,
  message,
  timeStamp,
  author,
});
