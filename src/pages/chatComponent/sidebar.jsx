import React from "react";
import { Search } from "./search";
import { Chats } from "./chats";

export const Sidebar = ({ client }) => {
  return (
    <div className="sidebar">
      <Search client={client}/>
      <Chats client={client}/>
    </div>
  );
};
