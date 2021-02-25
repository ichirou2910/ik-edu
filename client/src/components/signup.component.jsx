import React, { useState } from "react";

import { useHttpClient } from "../hooks/http-hook";
import { auth } from "../firebase/firebase.utils";

const Signup = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const { sendRequest } = useHttpClient();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Passwords don't match");
      return;
    }

    console.log({ displayName, email, password });

    try {
      await sendRequest(
        `${process.env.REACT_APP_API_URL}/user/signup`,
        "POST",
        JSON.stringify({
          displayName,
          email,
          password,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="signup">
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="displayName" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="displayName"
            id="displayName"
            className="form-control"
            value={displayName}
            label="Name"
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            value={email}
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            value={password}
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirm" className="form-label">
            Confirm password
          </label>
          <input
            type="password"
            name="confirm"
            id="confirm"
            className="form-control"
            value={confirm}
            label="Confirm Password"
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
