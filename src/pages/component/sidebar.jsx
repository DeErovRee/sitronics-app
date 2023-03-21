import React, { useState } from "react";
import { Link } from "react-router-dom";
// import AddIcon from '@material-ui/icons/Add'
import { useDispatch, useSelector } from "react-redux";

import { addChat, delChat } from "../../redux/chats/actions";

export const SidebarItem = () => {
  const dispatch = useDispatch();
  let chats = useSelector((state) => state.chats.chatList);

  if (chats === undefined) {
    return (chats = []);
  }

  //Удаление чата из списка чатов
  const onDelChat = (e) => {
    e.preventDefault();
    const ind = e.target.attributes.ind.value;
    const name = e.target.attributes.user.value;

    dispatch(delChat(name, ind));
  };

  return (
    <>
      <ul>
        <SidebarItemAdd />
        {chats.map((el, ind) => (
          <Link
            to={`/chats/chat${ind}`}
            key={ind}
            className="SidebarItem"
            data-id={el.id}
            data-title={el.name}
            data-fio={el.FIO}
          >
            <div className="chatImg">{el.FIO}</div>
            <div className="chatTitle">{el.name}</div>
            <button
              className="btnDelChat"
              type="button"
              user={el.name}
              ind={ind}
              onClick={(e) => {
                onDelChat(e);
              }}
            >
              X
            </button>
          </Link>
        ))}
      </ul>
    </>
  );
};

export const SidebarItemAdd = () => {
  const dispatch = useDispatch();

  const [text, setText] = useState("");

  const changeText = (event) => {
    setText(event.target.value);
  };

  const onAddChat = (e) => {
    e.preventDefault();
    let name = e.target[1].value;
    if (name === "") {
      name = "Новый пользователь";
    }
    dispatch(addChat(name));
    setText("");
  };

  return (
    <li>
      <form
        className="SidebarItemAdd sidebarItem formListAdd"
        onSubmit={(e) => onAddChat(e)}
      >
        <button type="submit" className="chatImg chatListAddBtn">
          {/* <AddIcon /> */}
        </button>
        <input
          type="text"
          placeholder="Введите пользователя"
          className="chatListAddInput"
          value={text}
          onChange={changeText}
        />
      </form>
    </li>
  );
};

export const Sidebar = ({
  chatList,
  setChatList,
  currentChat,
  setCurrentChat,
}) => {
  return (
    <div className="sidebar">
      <SidebarItem
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
        chatList={chatList}
        setChatList={setChatList}
      />
    </div>
  );
};
