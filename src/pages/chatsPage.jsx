import React from "react";
import { Chat } from "./chatComponent/chat";
import { Sidebar } from "./chatComponent/sidebar";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px 0 50px;
  background-color: white;
  background-image: linear-gradient(45deg, rgba(241, 2, 2, 0.61), rgba(0, 8, 255, 0.61));
`

const Workspace = styled.div`
  display: flex;
  justify-content: center;
  min-height: 700px;
  width: 80vh;
  background-color: #f2f2f2;
  border-radius: 50px;
`

export const ChatsPage = () => {
  const location = useLocation()
  const client = location.state?.client
  
  return (
    <div className="App">
      <Container>
        <Workspace>
          <Sidebar client={client} />
          <Chat client={client}/>
        </Workspace>
      </Container>
    </div>
  );
};
