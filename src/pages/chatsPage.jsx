import React from "react";
import { Chat } from "./chatComponent/chat";
import { Sidebar } from "./chatComponent/sidebar";
import { useLocation } from "react-router-dom";

export const ChatsPage = () => {
  const location = useLocation()
  const client = location.state?.client
  
  return (
    <div className="App">
      <div className="container">
        <div className="workSpace">
          <Sidebar client={client} />
          <Chat client={client}/>
        </div>
      </div>
    </div>
  );
};
