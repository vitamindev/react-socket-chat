import React, { useEffect, useState } from "react";

import "./ChatRoom.css";
import useChat from "../useChat";
import ChatMessage from "../ChatMessage/ChatMessage";
import useTyping from "../useTyping";
import NewMessageForm from "../NewMessageForm/NewMessageForm";
import TypingMessage from "../TypingMessage/TypingMessage";

const ChatRoom = (props) => {
  const { roomId } = props.match.params;
  const {
    messages,
    typingUsers,
    sendMessage,
    startTypingMessage,
    stopTypingMessage,
  } = useChat(roomId);
  const [newMessage, setNewMessage] = useState("");

  const { isTyping, startTyping, stopTyping } = useTyping();

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    sendMessage(newMessage);
    setNewMessage("");
  };

  useEffect(() => {
    if (isTyping) startTypingMessage();
    else stopTypingMessage();
  }, [isTyping]);

  return (
    <div className="chat-room-container">
      <h1 className="room-name">Room: {roomId}</h1>
      <div className="messages-container">
        <ol className="messages-list">
          {messages.map((message, i) => (
            <li key={i}>
              <ChatMessage message={message}></ChatMessage>
            </li>
          ))}
          {typingUsers.map((user, i) => (
            <li key={messages.length + i}>
              <TypingMessage user={user}></TypingMessage>
            </li>
          ))}
        </ol>
      </div>
      <NewMessageForm
        newMessage={newMessage}
        handleNewMessageChange={handleNewMessageChange}
        handleStartTyping={startTyping}
        handleStopTyping={stopTyping}
        handleSendMessage={handleSendMessage}
      ></NewMessageForm>
    </div>
  );
};

export default ChatRoom;
