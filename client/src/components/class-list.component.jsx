import React from "react";
import { Link } from "react-router-dom";

const ClassList = ({ classes }) => {
  return (
    <>
      <div className="row row-cols-3 g-4">
        {classes.map((cl, index) => (
          <div key={index} className="col">
            <div
              key={index}
              className="card border-info m-2"
              style={{ width: "18rem" }}
            >
              <div className="card-body">
                <h5 className="card-title">
                  <Link
                    className="text-decoration-none"
                    to={`/class/${cl.classId}`}
                  >
                    {cl.classId}
                  </Link>
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">{cl.schedule}</h6>
                <p className="card-text">{cl.members.length} member(s)</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ClassList;
