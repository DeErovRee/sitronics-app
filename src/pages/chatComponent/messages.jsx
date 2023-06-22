import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { Message } from "./message";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import styled from "styled-components";

const MessagesStyled = styled.div`
  height: 500px;
  overflow: scroll;
  margin: 10px 0 0;
  /* Скрываем scrollbar для IE, Edge и Firefox */
  -ms-overflow-style: none; /* IE и Edge */
  scrollbar-width: none; /* Firefox */

  /* Скрываем scrollbar для Chrome, Safari и Opera */
  &::-webkit-scrollbar {
    display: none;
  }
`

export const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return()=>{
      unsub()
    }
  }, [data.chatId]);
  
  return (
    <MessagesStyled>
      {messages.map((message) => (
        <Message message={message} key={message.id} />
      ))}
    </MessagesStyled>
  );
};
