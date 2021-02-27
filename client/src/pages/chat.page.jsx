import React, { useEffect, useContext, useState, useRef } from "react";

import UserContext from "../contexts/user.context";
import { useHttpClient } from "../hooks/http-hook";
import { socket } from "../App";

import {
  MessageList,
  GroupList,
  InputForm,
} from "../components/message.component";

import "../styles/chat.styles.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [loadedMessages, setLoadedMessages] = useState([]);
  const [msgPage, setMsgPage] = useState(0);

  const [classList, setClassList] = useState([]);
  const [activeId, setActiveId] = useState();

  const [input, setInput] = useState("");

  const endMessage = useRef(null);

  const currentUser = useContext(UserContext);
  const { isLoading, sendRequest } = useHttpClient();

  const switchHandler = async (id) => {
    try {
      const infoData = await sendRequest(
        `${process.env.REACT_APP_API_URL}/chat/${id}?page=1`,
        "GET",
        null,
        {
          Authorization: "Bearer " + currentUser.token,
        }
      );
      setMessages([...infoData.docs].reverse());
      setActiveId(id);
      setMsgPage(1);
    } catch (err) {}
  };

  const loadMore = async () => {
    if (msgPage) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/chat/${activeId}?page=${
            msgPage + 1
          }`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + currentUser.token,
            },
          }
        );
        const infoData = await response.json();

        if (!infoData.hasNextPage) setMsgPage(0);
        else setMsgPage(msgPage + 1);
        const newMessages = infoData.docs.reverse();
        setLoadedMessages([...newMessages, ...loadedMessages]);
      } catch (err) {}
    }
  };

  const scrollToRef = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const newMsg = {
      classId: activeId,
      sender_id: currentUser.uid,
      sender_name: currentUser.displayName,
      content: input,
    };
    socket.emit("chat", newMsg);

    setInput("");
  };

  useEffect(() => {
    scrollToRef(endMessage);
  }, [messages]);

  useEffect(() => {
    const fetchInfo = async () => {
      if (currentUser && currentUser.token) {
        try {
          const infoData = await sendRequest(
            `${process.env.REACT_APP_API_URL}/class/`,
            "GET",
            null,
            {
              Authorization: "Bearer " + currentUser.token,
            }
          );
          setClassList(infoData);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchInfo();
  }, [sendRequest, currentUser]);

  useEffect(() => {
    socket.on("inbox", (data) => {
      if (data.classId === activeId) setMessages([...messages, data]);
    });
    return () => {
      socket.off("inbox");
    };
  });

  return (
    <div className="chat">
      {!currentUser && <h2 className="text-center">Login to continue</h2>}
      {!isLoading && classList && currentUser && (
        <>
          <GroupList
            groups={classList}
            switchHandler={switchHandler}
            activeId={activeId}
          />
          <div className="chat__room border rounded border-dark">
            {!isLoading && messages && (
              <MessageList
                currentUserName={currentUser.displayName}
                loadedMessages={loadedMessages}
                messages={messages}
                hasNext={msgPage !== 0}
                loadMore={loadMore}
                endMessage={endMessage}
              />
            )}
            <InputForm
              input={input}
              onChange={(e) => setInput(e.target.value)}
              onSubmit={submitHandler}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
