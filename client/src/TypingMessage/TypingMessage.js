import React from "react";
import TypingAnimation from "../TypingAnimation/TypingAnimation";

import "./TypingMessage.css";

const TypingMessage = ({ user }) => {
  return (
    <div className="message-item">
      <div className="message-avatar-container">
        <img
          src={user.picture}
          alt={user.name}
          className={"message-avatar"}
        ></img>
      </div>

      <TypingAnimation></TypingAnimation>
    </div>
  );
};

export default TypingMessage;
