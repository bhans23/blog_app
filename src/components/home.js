import { useState, useEffect, useContext } from "react";
import Blog from "./blog.js";
import SignIn from "./signIn.js";
import { Link } from "react-router-dom";
import { UserContext } from "../api/UserContext.js";

const Home = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className='home'>
      {user ? (
        <>
        <Blog/>
        </>
      ) : (
        <>
          <div>
          <h1>Welcome to Blog Central</h1>
            <SignIn />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
