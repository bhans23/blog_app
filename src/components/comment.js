import { useState, useEffect } from "react";
import convertDate from "../api/convertDate.js";
import axios from "../api/axios";

const COMMENT_URL = "/comments";
const Comment = ({ cmt }) => {
  const [state, setState] = useState({
    content: cmt.content,
    created: cmt.created_at,
    updated: "",
    user: cmt.user.display_name,
    userId: cmt.user.id,
  });

  const deleteComment = () => {
    axios.delete(`${COMMENT_URL}/${cmt.id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  };

  const userOptions = () => {
    if (state.userId === parseInt(localStorage.getItem("userId"))) {
      return (
        <>
          <button>Edit</button>
          <button onClick={()=> deleteComment()}>Delete</button>
        </>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <p>{state.user}</p>
      <p>{convertDate(state.created)}</p>
      <p>{state.content}</p>
      <br />
      {userOptions()}
    </>
  );
};

export default Comment;

// {"comments": [{"id": 1, "content": "A comment on the first post!", "created_at": "2021-11-09T17:04:51.895Z",
// "updated_at": "2021-11-09T17:04:51.895Z", "user": {"id": 1, "display_name": "Superman"}}], "meta": {"current_page": 1, "per_page": 30, "total_entries": 1} }
