import React from "react";
import { Chat } from "./chatComponent/chat";
import { Sidebar } from "./chatComponent/sidebar";
import { useLocation } from "react-router-dom";

export const ChatsPage = () => {
  const location = useLocation()
  const CID = location.state?.CID
  
  return (
    <div className="App">
      <div className="container">
        <div className="workSpace">
          <Sidebar CID={CID} />
          <Chat CID={CID}/>
        </div>
      </div>
    </div>
  );
};
