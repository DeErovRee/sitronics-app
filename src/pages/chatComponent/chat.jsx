import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { Messages } from "./messages";
import { Input } from "./input";

export const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    
    <div className="chat">
      {data.user.displayName ? 
        <>
          <div className="chatInfo">
            <span>Чат с {data.user?.displayName}</span>
            <div className="chatIcon">
              <img src="" alt="" />
              <img src="" alt="" />
              <img src="" alt="" />
            </div>
          </div>
          <Messages />
          <Input />
        </>
        :
        <div className="chatInfo">
          <h1>Выберите пользователя</h1>
        </div>
      }
      
    </div>
  );
};
