import React, { useState, useRef, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import Home from "./home.js";
import axios from "../api/axios";

const LOGIN_URL = "https://brivity-react-exercise.herokuapp.com/users/sign_in";

const SignIn = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [state, setState] = useState({
    password: " ",
    userName: " ",
    errMsg: " ",
    success: false,
  });

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setState({ ...state, errMsg: "" });
  }, [state.userName, state.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ userName: state.userName, password: state.password }),
        {
          header: { "Content-Type": "application/json" },
          withCrendentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setState({ ...state, success: true, password: "", userName: "" });
    } catch (err) {
      if (!err?.response) {
        setState({ ...state, errMsg: "no Response" });
      }else if (err.response?.status === 401) {
        setState({ ...state, errMsg: "Unauthorized" });
      }else if (err.response?.status === 400) {
        setState({ ...state, errMsg: "Missing Username or Password" });
      }else{
        setState({ ...state, errMsg: "Login failed" });
      }
    
    }
  };

  return (
    <>
      {state.success ? (
        <div>
          <h1>Logged in Foo</h1>
          <br />
          <a href="/">Home</a>
        </div>
      ) : (
        <div>
          {console.log(state)}
          <p ref={errRef} className={state.errMsg ? "errmsg" : "offscreen"}>
            {state.errMsg}
          </p>
          <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <label htmlFor="user">User Name</label>
            <br />
            <input
              ref={userRef}
              type="text"
              id="userName"
              name="userName"
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
        </div>
      )}
    </>
  );
};

export default SignIn;
