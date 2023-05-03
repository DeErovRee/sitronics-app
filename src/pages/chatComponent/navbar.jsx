import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="user">
        <img src={currentUser.photoURL} alt="" width="45px" />
        <span>{currentUser.displayName}</span>
      </div>
    </div>
  );
};
