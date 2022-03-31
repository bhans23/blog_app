import React, { useState, useRNameef, useEffect, useContext } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";

const LOGIN_URL = "/users/sign_in";

const SignIn = () => {
  const [state, setState] = useState({
    password: " ",
    userName: " ",
    errMsg: " ",
    success: false,
  });

  useEffect(() => {
    setState({ ...state, errMsg: "" });
  }, [state.userName, state.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(LOGIN_URL, {
        user: { email: state.email, password: state.password },
      })
      .then((response) => {
        localStorage.setItem("token", response.headers.authorization);
        response
          ? setState({ ...state, success: true })
          : setState({ ...state, success: false });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {state.success ? (
        <div>
          <h1>Logged in Foo</h1>
          {window.location.reload()}
          <br />
        </div>
      ) : (
        <div>
          <p className={state.errMsg ? "errmsg" : "offscreen"}>
            {state.errMsg}
          </p>
          <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={handleChange}
            />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={handleChange}
            />
            <br />
            <input type="submit" value="Submit" />
          </form>
          <Link to="/createUser">Create User</Link>
        </div>
      )}
    </>
  );
};

export default SignIn;
