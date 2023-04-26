import React from "react";
import { Chat } from "./chatComponent/chat";
import { Sidebar } from "./chatComponent/sidebar";

export const ChatsPage = () => {
  return (
    <div className="App">
      <div className="container">
        <div className="workSpace">
          <Sidebar />
          <Chat />
        </div>
      </div>
    </div>
  );
};
