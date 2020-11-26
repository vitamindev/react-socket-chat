import React from "react";

import "./ChatMessage.css";

const ChatMessage = ({ message }) => {
  return (
    <div className="message-item">
      <div className="message-avatar-container">
        <img
          src={message.user.picture}
          alt={message.user.name}
          className={"message-avatar"}
        ></img>
      </div>

      <div
        className={`message-body ${
          message.ownedByCurrentUser ? "my-message" : "received-message"
        }`}
      >
        {message.body}
      </div>
    </div>
  );
};

export default ChatMessage;
