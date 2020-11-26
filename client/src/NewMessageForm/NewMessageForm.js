import React from "react";
import "./NewMessageForm.css";

const NewMessageForm = ({
  newMessage,
  handleNewMessageChange,
  handleStartTyping,
  handleStopTyping,
  handleSendMessage,
}) => {
  return (
    <form className="new-message-form">
      <input
        type="text"
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Aa"
        className="new-message-input-field"
        onKeyPress={handleStartTyping}
        onKeyUp={handleStopTyping}
      />
      <button
        type="submit"
        onClick={handleSendMessage}
        className="send-message-button"
      >
        Send
      </button>
    </form>
  );
};

export default NewMessageForm;
