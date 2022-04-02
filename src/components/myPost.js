import React from "react";
import axios from "../api/axios.js";

const POSTS_URL = "/posts";

const MyPost = () => {
  const getPosts = () => {
    axios.get(POSTS_URL).then((response) => {
        console.log(parseInt(localStorage.getItem("userId"),10))
     
      response.data.posts.map((post) => {
         
        if (parseInt(localStorage.getItem("userId"),10) === post.user.id) {
          console.log(post);
        } else {
          console.log(post);

        }
      });
    });
  };

  return (
    <>
      <h1>My Posts</h1>
      {getPosts()}
    </>
  );
};

export default MyPost;
