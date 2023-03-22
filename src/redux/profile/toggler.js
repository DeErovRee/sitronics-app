import React from "react";
import { useDispatch, useSelector } from "react-redux";

export const Toggler = () => {
  const isChecked = useSelector((state) => state.profile.profileClose);
  const dispatch = useDispatch();
  return (
    <>
      <input
        type="checkbox"
        value={isChecked}
        onChange={() => {
          dispatch({ type: "SWITCH_PRIVACY", payload: ["title"] });
        }}
      />
    </>
  );
};
