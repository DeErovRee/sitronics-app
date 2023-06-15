import React from "react";
import { Search } from "./search";
import { Chats } from "./chats";
import styled from "styled-components";

const SidebarStyled = styled.div`
  margin: 0;
  width: 30%;
  margin-right: 10px;
`

export const Sidebar = ({ client }) => {
  return (
    <SidebarStyled>
      <Search client={client}/>
      <Chats client={client}/>
    </SidebarStyled>
  );
};
