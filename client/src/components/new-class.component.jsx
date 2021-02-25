import React, { useState, useContext } from "react";

import { useHttpClient } from "../hooks/http-hook";
import UserContext from "../contexts/user.context";

const NewClass = () => {
  const [classId, setClassId] = useState("");
  const [schedule, setSchedule] = useState("");

  const currentUser = useContext(UserContext);

  const { sendRequest } = useHttpClient();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      sendRequest(
        `${process.env.REACT_APP_API_URL}/class/`,
        "POST",
        JSON.stringify({ classId, schedule }),
        {
          Authorization: "Bearer " + currentUser.token,
          "Content-Type": "application/json",
        }
      ).then(() => window.location.reload());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new-class">
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="classId" className="form-label">
            Class ID
          </label>
          <input
            type="text"
            className="form-control mb-2"
            id="classId"
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
          />
          <label htmlFor="schedule" className="form-label">
            Schedule
          </label>
          <input
            type="text"
            className="form-control"
            id="schedule"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewClass;
