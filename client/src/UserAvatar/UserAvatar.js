import React from "react";
import "./UserAvatar.css";

const UserAvatar = ({ user }) => {
  return (
    <>
      <img
        src={user.picture}
        alt={user.name}
        title={user.name}
        className={"avatar"}
      ></img>
    </>
  );
};

export default UserAvatar;
