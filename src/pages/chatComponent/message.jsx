import React, { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
// import { Messages } from "./messages";

export const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();
  // const [date, setDate] = useState();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.sendId === currentUser.uid && "owner"}`}
    >
      {console.log(message)}
      <div className="messageInfo">
        <img
          src={
            message.sendId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
          width="35px"
        />
        <span>date</span>
      </div>
      <div className="messageContent">
        {message.text && <p>{message.text}</p>}
        {message.file && <img src={message.file} alt="" width="65%" />}
      </div>
    </div>
  );
};
