import React from "react";
import { Search } from "./search";
import { Chats } from "./chats";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <Search />
      <Chats />
    </div>
  );
};
