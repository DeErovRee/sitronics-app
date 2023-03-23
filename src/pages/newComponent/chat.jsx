import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { Messages } from "./messages";
import { Input } from "./input";

export const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcon">
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};
