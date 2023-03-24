import React from "react";
import { Chat } from "./newComponent/chat";
import { Sidebar } from "./newComponent/sidebar";

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
