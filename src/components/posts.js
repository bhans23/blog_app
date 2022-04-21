import React, { useEffect, useState } from "react";
import axios from "../api/axios.js";
import convertDate from "../api/convertDate.js";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

import { Link, Routes, Route, useLocation } from "react-router-dom";

const POSTS_URL = "/posts";

// const { actions, posts } = usePosts();
// actions.nextPage, actions.previousPage

const MyPost = () => {
  const [state, setState] = useState({
    posts: [],
    page: 1,
    currentPage: null,
    range: null,
  });
  const location = useLocation();

  useEffect(() => {
    axios.get(`${POSTS_URL}?page=${state.page}`).then((response) => {
      const range =
        response.data.meta.total_entries / response.data.meta.per_page;

      setState((prevState) => ({
        ...prevState,
        posts: response.data.posts,
        currentPage: response.data.meta.current_page,
        range: range,
      }));
    });
  }, [state.page]);

  const pagePrevButton = () => {
    if (state.currentPage > 1) {
      return (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setState({ ...state, page: --state.page })}
        >
          &lt;--- Preivous Page
        </Button>
      );
    } else {
      return <></>;
    }
  };
  const pageNextButton = () => {
    if (state.currentPage < state.range) {
      return (
        <>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setState({ ...state, page: ++state.page })}
          >
            Next Page ---&gt;
          </Button>
        </>
      );
    } else {
      return <></>;
    }
  };

  return (
    <div>
      {console.log(state.range, state.currentPage)}

      <br />
      <p>Page {state.currentPage}</p>
      <div className="pageNav">
        {pagePrevButton()}

        {pageNextButton()}
      </div>
      <h1>Posts</h1>

      {state.posts.map((post) => (
        <div>
          <Card variant="outlined">
            <div className="title">
              <div className="titleBox">
                <p>By: {post.user.display_name}</p>
                <Link to="post" state={{ id: post.id, from: location }}>
                  <h2>"{post.title}"</h2>
                </Link>
                <div>
                  <p>Posted: {convertDate(post.created_at)}</p>
                  <p>Modified: {convertDate(post.updated_at)}</p>
                </div>
              </div>
              <hr />

              <p>"{post.body.substring(0, 15)}..."</p>
            </div>
          </Card>
        </div>
      ))}
      <p>Page {state.currentPage}</p>
      <div className="pageNav">
        {pagePrevButton()}

        {pageNextButton()}
      </div>
    </div>
  );
};

export default MyPost;

// Posts Index - Paginated
// GET - /posts
// Request Parameters
// /posts?page=1
// Response
// {"posts": [], "meta": {"current_page": 1, "per_page": 30, "total_entries": 0}}

// {"post": {"id": 2, "title": "My post from React", "body": "Lorem ipsum...", "created_at": "2021-11-09T16:04:51.895Z", "updated_at": "2021-11-09T16:04:51.895Z", "user": {"id": 1, "display_name": "Superman"}}}
