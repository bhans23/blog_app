import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../api/axios.js";

const POSTS_URL = "/posts";

const Post = () => {
  const [state, setState] = useState({
    title: "",
    body: "",
    created: "",
    updated: "",
    user: "",
  });
  const location = useLocation();
  const { id } = location.state;

  useEffect(() => {
    axios.get(`${POSTS_URL}/${id}`).then((response) => {
      const { post } = response.data;
      setState({
        ...state,
        title: post.title,
        body: post.body,
        created: Date(post.created_at),
        updated: Date(post.updated_at),
        user: post.user.display_name,
      });
    });
  }, []);

  return (
    <>
      <h1>{state.title}</h1>
      <p>Created by:{state.user}</p>
      <p>Created:{state.created}</p>
      <p>Updated{state.updated}</p>
      <p>{state.body}</p>
    </>
  );
};

export default Post;

// {"post": {"id": 2, "title": "My post from React", "body": "Lorem ipsum...", "created_at": "2021-11-09T16:04:51.895Z", "updated_at": "2021-11-09T16:04:51.895Z", "user": {"id": 1, "display_name": "Superman"}}}
