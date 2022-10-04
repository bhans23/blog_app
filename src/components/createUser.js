import React, { useRef, useState, useEffect } from "react";
import axios from "../api/axios";
import { Alert, AlertTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const REGISTER_URL = "/users";

const CreateUser = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [state, setState] = useState({
    email: " ",
    password: " ",
    userName: " ",
    errMsg: "",
    success: "",
  });

  const emailAlreadyTaken = () => {
    setError(true);
  };

  const successful = () => {
    setSuccess(true);
    setTimeout(() => navigate("/home"), 1500);
  };

  const handleChange = (e) => {
    setError(false);
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(REGISTER_URL, {
        user: {
          email: state.email,
          password: state.password,
          display_name: state.userName,
        },
      })
      .then((response) => {
        document.getElementById("newUserForm").reset();
        successful();
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status) {
          if (err.response.status === 422) {
            emailAlreadyTaken();
          }
        }
      });
  };

  useEffect(() => {
    setState({ ...state, errMsg: "" });
  }, [state.errMsg, state.userName]);

  return (
    <div>
      <p>{state.errMsg}</p>
      <h1>Create New Account</h1>
      <form onSubmit={handleSubmit} id="newUserForm">
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
        <label htmlFor="userName">User Name</label>
        <br />
        <input
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
          minLength="6"
          required
          onChange={handleChange}
        />
        <br />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
        {/* <input type="submit" value="Submit" /> */}
      </form>
      {error ? (
        <>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Email address is already taken —{" "}
            <strong>Please choose a different one</strong>
          </Alert>
        </>
      ) : (
        <></>
      )}
      {success ? (
        <>
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Account successfully created — <strong>Redirecting...</strong>
          </Alert>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CreateUser;

// {"user": {"email": "abc@123.com", "password": "super-secret", "display_name": "Superman"}}
