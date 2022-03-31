import { useState, useEffect } from "react";
import SignIn from "./signIn.js";
import { Link } from "react-router-dom";

const Home = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  },[]);
  return (
    <>
      {token ? (
        <div>
          <h1>Blog Mainia!!!</h1>
          <h1>Welcome</h1>
        </div>
      ) : (
        <div>
          <h1>Blog Mainia!!!</h1>
          <SignIn />
          <br />
        </div>
      )}
    </>
  );
};

export default Home;
