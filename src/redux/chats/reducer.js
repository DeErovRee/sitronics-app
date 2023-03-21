import { nanoid } from "@reduxjs/toolkit";
import { ADD_CHAT, DEL_CHAT } from "./actions";
import { getFIO } from "../../function/getFIO";

const initialState = {
  chatList: [],
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHAT:
      return {
        ...state,
        chatList: [
          ...state.chatList,
          {
            id: nanoid(),
            name: action.name,
            FIO: getFIO(action.name),
          },
        ],
      };
    case DEL_CHAT:
      return {
        ...state,
        chatList: [...state.chatList.filter((el) => el.name !== action.name)],
      };

    default:
      return state;
  }
};
