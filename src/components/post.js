import React, { useEffect, useState } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import axios from "../api/axios.js";
import Comments from "./comments.js";
import CreateComment from "./createComment.js";
import convertDate from "../api/convertDate.js";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";


const POSTS_URL = "/posts";

const Post = () => {
  const [state, setState] = useState({
    title: "",
    body: "",
    created: "",
    updated: "",
    user: "",
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
        created: post.created_at,
        updated: post.updated_at,
        user: post.user.display_name,
      });
    });
  });

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
    navigate("/blog/editPost", { state: { id: id } });
  };

  return (
    <>
      <div>
        <Card variant="outlined">
          <div className="title">
            <div className="titleBox">
              <p>By: {state.user}</p>

              <h2>"{state.title}"</h2>

              <div>
                <p>Posted: {convertDate(state.created)}</p>
                <p>Modified: {convertDate(state.updated)}</p>
              </div>
            </div>
            <hr />

            <p>"{state.body}..."</p>
          </div>

          <Button onClick={deletePost}>
            <DeleteForeverIcon />
          </Button>
          <Button onClick={editPost}>
            <EditIcon />
          </Button>

          <>
            <CreateComment id={id} />
          </>
        </Card>
      </div>
      <div>
        <h1>Comments</h1>
        <Comments id={id} />
      </div>
    </>
  );
};

export default Post;

// {"post": {"id": 2, "title": "My post from React", "body": "Lorem ipsum...", "created_at": "2021-11-09T16:04:51.895Z", "updated_at": "2021-11-09T16:04:51.895Z", "user": {"id": 1, "display_name": "Superman"}}}
