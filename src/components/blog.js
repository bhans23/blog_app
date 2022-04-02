import React, { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import CreatePost from "./createPost.js";
import MyPost from "./myPost.js";

const Blog = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <>
      {token ? (
        <div>
          <h1>Blog</h1>
          <Link to="createPost">Create Post</Link>
          <Link to="myPost">My Posts</Link>
          <Routes>
            <Route path="createPost" element={<CreatePost />} />
            <Route path="myPost" element={<MyPost />} />
          </Routes>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Blog;
