import React, { useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import { UserContext } from "../api/UserContext.js";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

const SIGNIN_URL = "/users/sign_in";

const SignIn = () => {
  const [state, setState] = useState({
    password: " ",
    userName: " ",
    err: false,
    errMsg: "",
    success: false,
  });
  const { user, setUser } = useContext(UserContext);
  // useEffect(() => {
  //   setState({ ...state, errMsg: "" });
  // }, [state.userName, state.password]);

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
        if (error.response.status === 401) {
          setState({ ...state, errMsg: error.response.data.error, err: true });
        }
      });
  };

  return (
    <>
      {user ? (
        <div></div>
      ) : (
        <div>
          {state.err ? (
            <div>
              <Alert severity="error">{state.errMsg}</Alert>
            </div>
          ) : (
            <></>
          )}

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
        </div>
      )}
    </>
  );
};

export default SignIn;
