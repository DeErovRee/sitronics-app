import React, { useContext } from "react";
import { auth } from "../../firebase/firebase";
import { AuthContext } from "";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <span className="logo">Sitronics chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
      </div>
    </div>
  );
};
