import React, { useEffect, useContext, useState } from "react";

import UserContext from "../contexts/user.context";
import { useHttpClient } from "../hooks/http-hook";

import ClassSearch from "../components/class-search.component";
import ClassList from "../components/class-list.component";
import NewClass from "../components/new-class.component";
import { FaPlus } from "react-icons/fa";

const HomePage = () => {
  const [classList, setClassList] = useState([]);
  const [showNewClass, setShowNewClass] = useState(false);

  const currentUser = useContext(UserContext);

  const { isLoading, error, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser && currentUser.token) {
        try {
          const data = await sendRequest(
            `${process.env.REACT_APP_API_URL}/class/`,
            "GET",
            null,
            {
              Authorization: "Bearer " + currentUser.token,
              "Content-Type": "application/json",
            }
          );
          setClassList(data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchData();
  }, [sendRequest, currentUser]);

  return (
    <>
      {!currentUser && <h2 className="text-center">Login to continue</h2>}
      {!isLoading && currentUser && classList && (
        <div className="class-list">
          <div className="d-flex justify-content-between">
            <h2>My classes</h2>
            {currentUser.isAdmin && (
              <button
                className="btn btn-primary btn-sm ml-3 mb-2"
                onClick={() => setShowNewClass(!showNewClass)}
              >
                <FaPlus /> New Class
              </button>
            )}
          </div>
          {showNewClass && <NewClass />}
          <hr />
          <ClassSearch />
          <br />
          <ClassList classes={classList} />
        </div>
      )}
    </>
  );
};

export default HomePage;
