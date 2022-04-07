import { useState, useEffect } from "react";
import axios from "../api/axios.js";
import Comment from "./comment.js";

const POSTS_URL = "/posts";

const Comments = ({ id }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`${POSTS_URL}/${id}/comments`).then((response) => {
      setComments(response.data.comments);
    });
  }, []);

  return (
    <>
      {comments.map((comment) => (
       <Comment cmt={comment}/>
      ))}
    </>
  );
};

export default Comments;

// {"comments": [{"id": 1, "content": "A comment on the first post!", "created_at": "2021-11-09T17:04:51.895Z",
// "updated_at": "2021-11-09T17:04:51.895Z", "user": {"id": 1, "display_name": "Superman"}}], "meta": {"current_page": 1, "per_page": 30, "total_entries": 1} }
