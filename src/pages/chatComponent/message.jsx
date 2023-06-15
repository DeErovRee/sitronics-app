import React, { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import styled from "styled-components";
import { UserImg } from "./search";

const MessageInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: gray;
  font-weight: 300;
  margin: 0;
`

const MessageContent = styled.div`
  max-width: 80%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  justify-content: flex-end;
`

const MessageP = styled.p`
  background-color: aliceblue;
  padding: 10px 20px;
  border-radius: 0px 10px 10px 10px;
  max-width: max-content;
  word-wrap: break-word;
  margin: 0;
`

const MessageStyled = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-direction: ${props => props.status === 'owner' ? 'row-reverse' : 'row'}
`

export const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <MessageStyled 
      status={message.sendId === currentUser.uid && 'owner'}
      ref={ref}
    >
      <MessageInfo>
        <UserImg
          src={
            message.sendId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>date</span>
      </MessageInfo>
      <MessageContent>
        {message.text && <MessageP>{message.text}</MessageP>}
        {message.file && <img src={message.file} alt="" width="65%" margin="0"/>}
      </MessageContent>
    </MessageStyled>
  );
};
