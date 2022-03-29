import React, { useRef, useState, useEffect } from "react";

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
  };

  useEffect(() => {
    setState({ ...state, errMsg: "" });
  }, [state.errMsg, state.userName]);
  return (
    <div>
      <p>{state.errMsg}</p>
      <h1>CreateUser</h1>
      <form>
        <label for="email">Email</label>
        <br />
        <input
          type="email"
          id="email"
          name="email"
          required
          onChange={handleChange}
        />
        <br />
        <label for="userName">User Name</label>
        <br />
        <input
          type="text"
          id="userName"
          name="userName"
          required
          onChange={handleChange}
        />
        <br />
        <label for="password">Password</label>
        <br />
        <input
          type="password"
          id="password"
          name="password"
          required
          onChange={handleChange}
        />
        <br />
        <button onSubmit={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default CreateUser;

// {"user": {"email": "abc@123.com", "password": "super-secret", "display_name": "Superman"}}
