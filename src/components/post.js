import React, { useEffect, useState } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import axios from "../api/axios.js";
import Comments from "./comments.js";
import CreateComment from "./createComment.js";

const POSTS_URL = "/posts";

const Post = () => {
  const [state, setState] = useState({
    title: "",
    body: "",
    created: "",
    updated: "",
    user: "",
    createComment: false
  });
  const navigate = useNavigate();
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
  }, [state.createComment]);

  const deletePost = () => {
    axios
      .delete(`${POSTS_URL}/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(() => {
        navigate("/blog/posts");
      });
  };
  const editPost = () => {
    navigate("/blog/editPost", {state: {id: id}});
    
  };

  return (
    <>
      <div>
        <h1>{state.title}</h1>
        <p>Created by:{state.user}</p>
        <p>Created:{state.created}</p>
        <p>Updated{state.updated}</p>
        <p>{state.body}</p>
      </div>
      <button onClick={deletePost}>Delete</button>
      <button onClick={editPost}>EDIT</button>
      <button onClick={()=>setState({...state,createComment: true})}>Comment</button>
      {state.createComment ? (
        <>
        <CreateComment id={id}/>
        <button onClick={()=>setState({...state,createComment: false})}>Cancel</button>
        </>
      ):(
        <></>
      )}
      <div>
        <h1>Comments</h1>
        <Comments id={id} />
      </div>
    </>
  );
};

export default Post;

// {"post": {"id": 2, "title": "My post from React", "body": "Lorem ipsum...", "created_at": "2021-11-09T16:04:51.895Z", "updated_at": "2021-11-09T16:04:51.895Z", "user": {"id": 1, "display_name": "Superman"}}}
