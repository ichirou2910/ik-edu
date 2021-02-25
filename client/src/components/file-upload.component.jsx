import React, { useState, useRef, useContext } from "react";
import { useLocation } from "react-router-dom";

import { useHttpClient } from "../hooks/http-hook";
import UserContext from "../contexts/user.context";
import { getFileTypes } from "../utils/file";

import { FaUpload } from "react-icons/fa";

const FileUpload = ({ extendText }) => {
  const fileRef = useRef();
  const location = useLocation();
  const currentUser = useContext(UserContext);

  const { sendRequest } = useHttpClient();

  const uploadFile = async (file) => {
    const classId = location.pathname.substr(7);
    const formData = new FormData();

    formData.append("file", file);

    try {
      sendRequest(
        `${process.env.REACT_APP_API_URL}/lecture/${classId}/file`,
        "POST",
        formData,
        {
          Authorization: "Bearer " + currentUser.token,
        }
      ).then((res) => {
        const ftp = getFileTypes(res.path);
        // Parse markdown text to extend
        const text = `<img height="24" width="24" src="${process.env.REACT_APP_HOST_URL}/static/icons/${ftp}.svg" /> [${res.name}](${process.env.REACT_APP_HOST_URL}/static/files/${classId}/${res.name})`;
        extendText(text);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileRef}
        name="file"
        id="file"
        onChange={(e) => uploadFile(e.target.files[0])}
        style={{ display: "none" }}
      />
      <button
        type="button"
        className="btn btn-info my-2 ml-2"
        onClick={() => fileRef.current.click()}
      >
        <FaUpload /> Upload File
      </button>
    </div>
  );
};

export default FileUpload;
