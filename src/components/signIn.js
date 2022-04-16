import React, { useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import { UserContext } from "../api/UserContext.js";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

const SIGNIN_URL = "/users/sign_in";

const SignIn = () => {
  const [state, setState] = useState({
    password: " ",
    userName: " ",
    errMsg: " ",
    success: false,
  });
  const { user, setUser } = useContext(UserContext);
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
      .post(SIGNIN_URL, {
        user: { email: state.email, password: state.password },
      })
      .then((response) => {
        localStorage.setItem("token", response.headers.authorization);
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("display_name", response.data.display_name);
        setState({ ...state, userName: response.data.display_name });
        // navigate("/")
        response ? setUser(true) : setUser(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {user ? (
        <div></div>
      ) : (
        <div>
          <Paper elevation={10}>
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
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            {/* <input type="submit" value="Submit" /> */}
          </form>
          <Button variant="contained" component={Link} to="/createUser">
            New Account
          </Button>
          {/* <Link to="/createUser">New Account</Link> */}
          </Paper>
        </div>
      )}
    </>
  );
};

export default SignIn;
