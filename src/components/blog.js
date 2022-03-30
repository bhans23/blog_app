import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import CreatePost from "./createPost.js";

const Blog = () => {
  return (
    <div>
      <h1>Blog</h1>
      <Link to="createPost">Create Post</Link>
      <Routes>
        <Route path="createPost" element={<CreatePost />} />
      </Routes>
    </div>
  );
};

export default Blog;
