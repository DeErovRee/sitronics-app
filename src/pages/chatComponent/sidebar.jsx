import React from "react";
import { Search } from "./search";
import { Chats } from "./chats";

export const Sidebar = ({ CID }) => {
  return (
    <div className="sidebar">
      <Search CID={CID}/>
      <Chats CID={CID}/>
    </div>
  );
};
