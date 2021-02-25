import React, { useState, useEffect, useContext } from "react";

import { useHttpClient } from "../hooks/http-hook";

import UserContext from "../contexts/user.context";

const PendingList = ({ classId }) => {
  const [pending, setPending] = useState(null);

  const currentUser = useContext(UserContext);
  const { isLoading, sendRequest } = useHttpClient();

  const handleJoin = async (uid, accept) => {
    console.log(accept, uid);
    try {
      sendRequest(
        `${process.env.REACT_APP_API_URL}/class/${classId}/member`,
        "POST",
        JSON.stringify({
          classId,
          uid,
          accept,
        }),
        {
          Authorization: "Bearer " + currentUser.token,
          "Content-Type": "application/json",
        }
      ).then(() => window.location.reload());
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser && currentUser.token) {
        try {
          const data = await sendRequest(
            `${process.env.REACT_APP_API_URL}/class/${classId}/pending`,
            "GET",
            null,
            {
              Authorization: "Bearer " + currentUser.token,
              "Content-Type": "application/json",
            }
          );
          setPending(data);
        } catch (err) {
          console.log(err.message);
        }
      }
    };
    fetchData();
  }, [classId, sendRequest, currentUser]);

  return (
    <>
      <h3>Pending</h3>
      <br />
      {!isLoading &&
        pending &&
        pending.map((mem, index) => (
          <div key={index} className="card p-2 my-1 border-info">
            <p className="m-0">{mem.name}</p>
            <p>{mem.email}</p>
            <div className="d-flex">
              <button
                type="button"
                className="btn mr-1 btn-success btn-sm"
                onClick={() => handleJoin(mem.id, true)}
              >
                Accept
              </button>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => handleJoin(mem.id, false)}
              >
                Deny
              </button>
            </div>
          </div>
        ))}
    </>
  );
};

export default PendingList;
