import React from "react";

import Login from "../components/login.component";
import Signup from "../components/signup.component";

const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <hr className="border-dark" />
      <Signup />
    </div>
  );
};

export default Auth;
