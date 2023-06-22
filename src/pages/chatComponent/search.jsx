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
import styled from "styled-components";

const SearchStyled = styled.div`
  margin: 20px 0px 5px 20px;

  @media (max-width: 1024px) {
    margin: 0;
  }
`

const SearchInput = styled.input`
  border-radius: 10px;
  width: 100%;
  border: none;
  height: 30px;
  padding: 10px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    width: auto;
    margin: 0 0 15px;
  }
`

export const UserChat = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 10px 0px;

  @media (max-width: 1024px) {
    margin: 10px 0 10px 15px;
  }
`

export const UserImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`

export const UserChatInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0px;
  justify-content: center;
  margin-left: 8px;
`

export const UserName = styled.div`
  width: 100%;
  font-weight: 500;
  font-size: large;
  margin: 0;
  text-transform: capitalize;
`

const SearchUsers = styled.div`
  border: 1px solid #d9d9d9;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: row;
    margin: 0 -15px 0;
    overflow: scroll;
  }
`

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
    <SearchStyled>
      <div>
        <SearchInput
          type="text"
          placeholder="Найти пользователя"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {error && <span>Пользователь не найден</span>}
      <SearchUsers>
        {user && (
        <UserChat onClick={handleSelect}>
          <UserImg src={file} alt="user-avatar" />
          <UserChatInfo>
            <UserName>{user.displayName}</UserName>
          </UserChatInfo>
        </UserChat>
        )}
      </SearchUsers>
    </SearchStyled>
  );
};
