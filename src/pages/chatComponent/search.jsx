import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

import { AuthContext } from "../../context/AuthContext";

export const Search = ({ client }) => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(client ? client : null);
  const [error, setError] = useState(false);
  const [file, setFile] = useState(null);

  const { currentUser } = useContext(AuthContext);
  
  const handleSearch = async () => {
    setUser(null);
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const queryShapshot = await getDocs(q);
      queryShapshot.forEach((doc) => {
        setUser(doc.data());
        setFile(doc.data().photoURL);
      });
    } catch (error) {
      console.log(error.message)
    }
  };

  const handleSelect = async () => {
    
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error.message);
    }

    setError(false);
    setUser(null);
    setUsername("");
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  useEffect(()=>{
    if(user){
      handleSelect()
    }
    
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Найти пользователя"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {error && <span>Пользователь не найден</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={file} alt="user-avatar" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};
