import React from "react";

import "../styles/chat.styles.css";

const Message = ({ item, owner }) => {
  const d = new Date(item.date);
  return (
    <li
      className="my-3"
      data-bs-toggle="tooltip"
      data-bs-placement="bottom"
      title={
        [d.getDate(), d.getMonth() + 1, d.getFullYear()].join("/") +
        " " +
        [d.getHours(), d.getMinutes()].join(":")
      }
    >
      <span
        className={`${
          item.sender_name === owner ? "text-primary" : "text-info"
        }`}
      >
        {item.sender_name}:
      </span>{" "}
      {item.content}
    </li>
  );
};

const MessageList = ({
  currentUserName,
  loadedMessages,
  messages,
  hasNext,
  loadMore,
  endMessage,
}) => {
  return (
    <div className="chat__messages border rounded border-danger flex-grow-1">
      {messages.length >= 30 && hasNext ? (
        <div>
          <p
            className="text-center text-info"
            onClick={loadMore}
            style={{ cursor: "pointer" }}
          >
            -- Load older messages --
          </p>
        </div>
      ) : null}
      <ul>
        {loadedMessages.map((item, index) => {
          return <Message key={index} item={item} owner={currentUserName} />;
        })}
        {messages.map((item, index) => {
          return <Message key={index} item={item} owner={currentUserName} />;
        })}
        <div ref={endMessage}></div>
      </ul>
    </div>
  );
};

const GroupList = ({ groups, switchHandler, activeId }) => {
  return (
    <div className="chat__list border rounded border-dark">
      <ul>
        {groups.map((gr, index) => {
          return (
            <li
              key={index}
              className={`border rounded ${
                gr.classId === activeId ? "border-danger" : "border-info"
              }`}
              onClick={() => switchHandler(gr.classId)}
            >
              {gr.classId}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const InputForm = ({ input, onChange, onSubmit }) => {
  return (
    <div className="chat__input mt-2">
      <form onSubmit={onSubmit} autoComplete="off">
        <input
          id="input"
          type="text"
          name="input"
          value={input}
          className="form-control border-primary"
          placeholder="Type message here"
          onChange={onChange}
        />
        <button type="submit" className="btn btn-primary btn-sm ml-1">
          SEND
        </button>
      </form>
    </div>
  );
};

export { MessageList, GroupList, InputForm };
