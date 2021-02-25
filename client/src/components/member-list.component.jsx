import React, { useState } from "react";

const MemberList = ({ members: data }) => {
  const [members] = useState(data);

  return (
    <>
      <h3>Members</h3>
      <br />
      <div className="card border-dark">
        <div className="card-body">
          {members.map((mem, index) => (
            <p key={index} className="mb-2">
              {index + 1}. {mem.name}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default MemberList;
