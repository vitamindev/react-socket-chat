import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";

const NEW_CHAT_MESSAGE_EVENT = "NEW_CHAT_MESSAGE_EVENT";
const START_TYPING_MESSAGE_EVENT = "START_TYPING_MESSAGE_EVENT";
const STOP_TYPING_MESSAGE_EVENT = "STOP_TYPING_MESSAGE_EVENT";
const SOCKET_SERVER_URL = "http://localhost:4000";

const useChat = (roomId) => {
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [user, setUser] = useState();
  const socketRef = useRef();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get("https://api.randomuser.me/");
      const result = response.data.results[0];
      console.log("user", result);
      setUser({
        name: result.name.first,
        picture: result.picture.thumbnail,
      });
    };

    fetchUser();
  }, []);

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.on("connect", () => {
      console.log(socketRef.current.id);
    });

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      console.log(incomingMessage);
      setMessages((messages) => [...messages, incomingMessage]);
    });

    socketRef.current.on(START_TYPING_MESSAGE_EVENT, (user) => {
      setTypingUsers((users) => [...users, user]);
    });

    socketRef.current.on(STOP_TYPING_MESSAGE_EVENT, (user) => {
      setTypingUsers((users) => users.filter((u) => u.name !== user.name));
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, user]);

  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
      user: user,
    });
  };

  const startTypingMessage = () => {
    socketRef.current.emit(START_TYPING_MESSAGE_EVENT, user);
  };

  const stopTypingMessage = () => {
    socketRef.current.emit(STOP_TYPING_MESSAGE_EVENT, user);
  };

  return {
    messages,
    typingUsers,
    sendMessage,
    startTypingMessage,
    stopTypingMessage,
  };
};

export default useChat;
