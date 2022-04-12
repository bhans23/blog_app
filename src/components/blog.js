import React, { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import CreatePost from "./createPost.js";
import EditPost from "./editPost.js";
import Posts from "./posts.js";
import Post from "./post.js";

const Blog = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <>
      {token ? (
        <div>
          <h1>Blog</h1>
          <Link to="createPost">Create Post</Link>
          <Link to="posts">Posts</Link>
          <Routes>
            <Route path="createPost" element={<CreatePost />} />
            <Route path="editPost" element={<EditPost />} />

            <Route path="posts" element={<Posts />} />
            <Route path="/posts/post" element={<Post />} />
          </Routes>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Blog;
