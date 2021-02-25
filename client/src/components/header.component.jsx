import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { auth } from "../firebase/firebase.utils";
import UserContext from "../contexts/user.context";

const Header = () => {
  const currentUser = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          IK Edu
        </Link>
        <div className="navbar-nav me-auto mb-2 mb-lg-0">
          {currentUser ? (
            <>
              <div className="d-flex mr-3 align-items-center">
                <p className="mb-0">Hello, {currentUser.displayName}</p>
              </div>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => auth.signOut()}
              >
                LOGOUT
              </button>
            </>
          ) : (
            <Link to="/auth" className="btn btn-primary">
              LOGIN
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
