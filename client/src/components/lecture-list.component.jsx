import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";

import { renderMarkdown } from "../utils/marked";
import { useHttpClient } from "../hooks/http-hook";
import UserContext from "../contexts/user.context";

import { FaCheck, FaEdit, FaPlus } from "react-icons/fa";
import LectureEditor from "./lecture-editor.component";

import "../styles/lecture-list.styles.css";

const LectureList = () => {
  const [lectures, setLectures] = useState(null);
  const [lecEdited, setLecEdited] = useState(false);
  const [lecHidden, setLecHidden] = useState([]);

  const classId = useParams().classId;
  const currentUser = useContext(UserContext);

  const { isLoading, error, sendRequest } = useHttpClient();

  const editorToggle = (index) => {
    let newState = [...lecHidden];
    newState[index] = !newState[index];
    setLecHidden([...newState]);
  };

  // Add one lecture to the end
  const addLecture = () => {
    let temp = lectures ? [...lectures] : [];
    temp.push("New Lecture");
    setLectures(temp);
  };

  // This just update local state, for preview purpose
  const lectureSave = (index, content) => {
    let oldLectures = [...lectures];
    oldLectures[index] = content;
    setLectures(oldLectures);
    if (!lecEdited) setLecEdited(true);
  };

  // This actually request to change lecture content
  const confirmLectureSave = async () => {
    try {
      sendRequest(
        `${process.env.REACT_APP_API_URL}/lecture/${classId}`,
        "PUT",
        JSON.stringify({ content: lectures }),
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
          const lData = await sendRequest(
            `${process.env.REACT_APP_API_URL}/lecture/${classId}`,
            "GET",
            null,
            {
              Authorization: "Bearer " + currentUser.token,
              "Content-Type": "application/json",
            }
          );
          setLectures(lData);
        } catch (err) {
          console.log(err.message);
        }
      }
    };
    fetchData();
  }, [sendRequest, classId, currentUser]);

  return (
    <div className="lecture-list">
      <div className="d-flex">
        <h3>Lectures</h3>
        {currentUser.isAdmin && lecEdited && (
          <button
            type="button"
            className="btn btn-success btn-sm ml-3 mb-2"
            onClick={confirmLectureSave}
          >
            <FaCheck /> Confirm Save
          </button>
        )}
      </div>
      <br />
      {!lectures && <p className="text-center">(No lecture available)</p>}
      {!isLoading &&
        lectures &&
        lectures.map((lec, index) => (
          <div key={index}>
            {currentUser.isAdmin && lecHidden[index] && (
              <div className="card border-0">
                <LectureEditor
                  index={index}
                  classId={classId}
                  content={lec}
                  cancel={() => editorToggle(index)}
                  confirm={lectureSave}
                />
              </div>
            )}
            {!lecHidden[index] && (
              <div key={index} className="card mb-4 border-dark">
                <div className="card-body position-relative">
                  {currentUser.isAdmin && (
                    <button
                      type="button"
                      className="position-absolute btn btn-primary btn-sm"
                      style={{ top: "1.25rem", right: "1.25rem" }}
                      onClick={() => editorToggle(index)}
                    >
                      <FaEdit /> Edit
                    </button>
                  )}
                  <div
                    key={index}
                    dangerouslySetInnerHTML={renderMarkdown(lec)}
                    className="align-bottom"
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      {currentUser.isAdmin && (
        <button
          type="button"
          className="btn btn-info mb-3"
          onClick={addLecture}
        >
          <FaPlus /> New Lecture
        </button>
      )}
    </div>
  );
};

export default LectureList;
