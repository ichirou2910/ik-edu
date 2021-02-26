import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const ClassSearch = () => {
  const [classId, setClassId] = useState("");

  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    history.push(`/class/${classId}`);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="row row-cols-lg-auto g-3 align-items-center">
        <div className="col-12">
          <input
            type="text"
            className="form-control"
            id="classId"
            placeholder="Search for class ID"
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-sm" hidden>
          Search
        </button>
      </div>
    </form>
  );
};

export default ClassSearch;
