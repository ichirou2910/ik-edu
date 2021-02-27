import React, { useContext } from "react";
import { Link } from "react-router-dom";

import UserContext from "../contexts/user.context";

import { ReactComponent as ChatIcon } from "../assets/chat.svg";

import "../styles/chat-button.styles.css";

const ChatButton = () => {
  const currentUser = useContext(UserContext);

  return (
    currentUser && (
      <div className="chat-button">
        <Link to="/chat" className="chat-button__icon">
          <ChatIcon />
        </Link>
      </div>
    )
  );
};

export default ChatButton;
