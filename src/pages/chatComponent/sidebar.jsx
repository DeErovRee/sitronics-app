import React from "react";
import { Search } from "./search";
import { Chats } from "./chats";
import styled from "styled-components";

const SidebarStyled = styled.div`
  margin: 0 10px 0 0;
  width: 30%;

  @media (max-width: 1024px) {
    width: 100%;
    margin: 0;
  }
`

export const Sidebar = ({ client }) => {
  return (
    <SidebarStyled>
      <Search client={client}/>
      <Chats client={client}/>
    </SidebarStyled>
  );
};
