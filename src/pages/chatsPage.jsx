import React from "react";
import { Sidebar } from "./component/sidebar";
import { MessageField } from "./component/messageField";

export const ChatsPage = () => {
  return (
    <div className="App">
      <div className="workSpace">
        <Sidebar />
        <MessageField />
      </div>
    </div>
  );
};
