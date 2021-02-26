import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { useHttpClient } from "../hooks/http-hook";
import UserContext from "../contexts/user.context";

import ClassSearch from "../components/class-search.component";
import LectureList from "../components/lecture-list.component";
import MemberList from "../components/member-list.component";
import PendingList from "../components/pending-list.component";

const ClassPage = () => {
  const [classData, setClassData] = useState(null);

  const classId = useParams().classId;
  const currentUser = useContext(UserContext);

  const { isLoading, error, sendRequest } = useHttpClient();

  const joinRequest = async () => {
    const { email, displayName: name, uid: id } = currentUser;
    try {
      await sendRequest(
        `${process.env.REACT_APP_API_URL}/class/${classId}/join`,
        "POST",
        JSON.stringify({
          name,
          email,
          id,
        }),
        {
          Authorization: "Bearer " + currentUser.token,
          "Content-Type": "application/json",
        }
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser && currentUser.token) {
        try {
          const cData = await sendRequest(
            `${process.env.REACT_APP_API_URL}/class/${classId}`,
            "GET",
            null,
            {
              Authorization: "Bearer " + currentUser.token,
              "Content-Type": "application/json",
            }
          );
          setClassData(cData);
        } catch (err) {
          console.log(err.message);
        }
      }
    };
    fetchData();
  }, [sendRequest, classId, currentUser]);

  return (
    <>
      {/* {error && ( */}
      {/*   <> */}
      {/*     <h4 className="text-danger">{error}</h4> */}
      {/*     <p className="text-danger"> */}
      {/*       Please try looking for another class or contact the admin. */}
      {/*     </p> */}
      {/*     <ClassSearch /> */}
      {/*     <br /> */}
      {/*   </> */}
      {/* )} */}
      <h2>{classId}</h2>
      <br />
      {!isLoading && currentUser && !classData && (
        <div>
          <p>
            Looks like you haven't joined this class. Click the button below to
            make a join request.
          </p>
          <button className="btn btn-primary" onClick={joinRequest}>
            JOIN
          </button>
        </div>
      )}
      <br />
      {!isLoading && currentUser && classData && (
        <>
          <div className="d-flex">
            <div className="flex-grow-1">
              <LectureList />
            </div>
            <div className="w-25 ml-4">
              <MemberList members={classData.members} />
              <br />
              {currentUser.isAdmin && <PendingList classId={classId} />}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ClassPage;
