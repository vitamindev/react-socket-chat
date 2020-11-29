import React from "react";
import UserAvatar from "../UserAvatar/UserAvatar";

import "./ChatMessage.css";

const ChatMessage = ({ message }) => {
  return (
    <div
      className={`message-item ${
        message.ownedByCurrentUser ? "my-message" : "received-message"
      }`}
    >
      {!message.ownedByCurrentUser && (
        <div className="message-avatar-container">
          <UserAvatar user={message.user}></UserAvatar>
        </div>
      )}

      <div className="message-body-container">
        {!message.ownedByCurrentUser && (
          <div className="message-user-name">{message.user.name}</div>
        )}
        <div className="message-body">{message.body}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
