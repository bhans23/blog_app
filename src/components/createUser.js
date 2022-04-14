import React, { useRef, useState, useEffect } from "react";
import axios from "../api/axios";

const REGISTER_URL = "/users";

const CreateUser = () => {
  const [state, setState] = useState({
    email: " ",
    password: " ",
    userName: " ",
    errMsg: "",
    success: "",
  });

  const handleChange = (e) => {
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
       
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setState({ ...state, errMsg: "" });
  }, [state.errMsg, state.userName]);
  return (
    <div>
      <p>{state.errMsg}</p>
      <h1>CreateUser</h1>
      <form onSubmit={handleSubmit}>
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
          minLength='6'
          required
          onChange={handleChange}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default CreateUser;

// {"user": {"email": "abc@123.com", "password": "super-secret", "display_name": "Superman"}}
