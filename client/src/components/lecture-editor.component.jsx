import React, { useState, useEffect, useContext } from "react";

import { FaSave, FaTimes, FaUpload } from "react-icons/fa";
import FileUpload from "./file-upload.component";

const LectureEditor = ({ index, confirm, content, cancel }) => {
  const [lecture, setLecture] = useState(content);

  const submitHandler = (e) => {
    e.preventDefault();
    confirm(index, lecture);
    cancel();
  };

  // File uploading works by uploading in a file to server
  // then extend the file's location to markdown content
  const extendText = (text) => {
    setLecture(`${lecture}\n${text}\n`);
  };

  return (
    <>
      <form className="form-floating" onSubmit={submitHandler}>
        <textarea
          className="form-control border-primary text-dark"
          id="content"
          style={{ height: "300px", overflowY: "auto" }}
          value={lecture}
          onChange={(e) => setLecture(e.target.value)}
        ></textarea>
        <div className="d-flex justify-content-between">
          <div>
            <button type="submit" className="btn btn-success my-2">
              <FaSave /> Save
            </button>
            <button
              type="button"
              className="btn btn-danger my-2 ml-2"
              onClick={cancel}
            >
              <FaTimes /> Cancel
            </button>
          </div>
          <FileUpload extendText={extendText} />
        </div>
      </form>
    </>
  );
};

export default LectureEditor;
