import React, { useEffect, useContext, useState, useRef } from "react";

import UserContext from "../contexts/user.context";
import { useHttpClient } from "../hooks/http-hook";
import { socket } from "../App";

import "../styles/chat.styles.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [classList, setClassList] = useState([]);
  const [activeId, setActiveId] = useState();

  const endMessage = useRef(null);

  const currentUser = useContext(UserContext);
  const { isLoading, error, sendRequest } = useHttpClient();

  const switchHandler = async (id) => {
    try {
      const infoData = await sendRequest(
        `${process.env.REACT_APP_API_URL}/chat/${id}`,
        "GET",
        null,
        {
          Authorization: "Bearer " + currentUser.token,
        }
      );
      setMessages(infoData);
      setActiveId(id);
    } catch (err) {}
  };

  const scrollToBottom = () => {
    endMessage.current?.scrollIntoView({ behavior: "smooth" });
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
    scrollToBottom();
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
          <div className="chat__list border rounded border-dark">
            <ul>
              {classList.map((cl, index) => {
                return (
                  <li
                    key={index}
                    className={`border rounded ${
                      cl.classId === activeId ? "border-danger" : "border-info"
                    }`}
                    onClick={() => switchHandler(cl.classId)}
                  >
                    {cl.classId}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="chat__room border rounded border-dark">
            <div className="chat__messages border rounded border-danger flex-grow-1">
              {!isLoading && messages && (
                <>
                  <ul>
                    {messages.map((item, index) => {
                      return (
                        <li key={index} className="my-3">
                          <span
                            className={`${
                              item.sender_name === currentUser.displayName
                                ? "text-primary"
                                : "text-info"
                            }`}
                          >
                            {item.sender_name}:
                          </span>{" "}
                          {item.content}
                        </li>
                      );
                    })}
                    <div ref={endMessage}></div>
                  </ul>
                </>
              )}
            </div>
            <div className="chat__input mt-2">
              <form onSubmit={submitHandler} autoComplete="off">
                <input
                  id="input"
                  type="text"
                  name="input"
                  value={input}
                  className="form-control border-primary"
                  placeholder="Type message here"
                  onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit" className="btn btn-primary btn-sm ml-1">
                  SEND
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
