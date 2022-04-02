import React, { useEffect, useState } from "react";
import axios from "../api/axios.js";

const POSTS_URL = "/posts";

// const { actions, posts } = usePosts();
// actions.nextPage, actions.previousPage

const MyPost = () => {
  const [state, setState] = useState({
    posts: [],
    page: 1,
  });


  useEffect(() => {
    axios.get(`${POSTS_URL}?page=${state.page}`).then((response) => {
      setState((prevState) => ({ ...prevState, posts: response.data.posts }));
    });
  }, [state.page]);

  return (
    <>
      <h1>My Posts</h1>
      {state.posts.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
      {console.log(state.page)}
      <button onClick={() => setState({ ...state, page: --state.page })}></button>
      <button onClick={() => setState({ ...state, page: --state.page })}>
        Preious Page{state.page}
      </button>
      <button onClick={() => setState({ ...state, page: ++state.page })}>
        Next Page{state.page}
      </button>
    </>
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
