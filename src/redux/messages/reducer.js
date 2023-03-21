import { nanoid } from "nanoid";
import { ADD_MESSAGE } from "./actions";

const initialState = {
  messageList: [],
};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      const currentList = state.messageList[action.chatId] || [];
      return {
        ...state,
        messageList: {
          ...state.messageList,
          [action.chatId]: [
            ...currentList,
            {
              author: action.author,
              message: action.message,
              id: nanoid(),
              time: action.timeStamp,
            },
          ],
        },
      };
    default:
      return state;
  }
};
