import { useState, useEffect } from "react";
import axios from "../api/axios.js";
import Comment from "./comment.js";


const POSTS_URL = "/posts";

const Comments = ({ id }) => {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [range, setRange] = useState("");

  useEffect(() => {
    axios.get(`${POSTS_URL}/${id}/comments?page=${page}`).then((response) => {
      const range =
        response.data.meta.total_entries / response.data.meta.per_page;
      setComments(response.data.comments);
      setRange(range);
    });
  });

  return (
    <>
      {comments.map((comment) => (
        <>
         
            <Comment cmt={comment} />
         
        </>
      ))}
    </>
  );
};

export default Comments;

// {"comments": [{"id": 1, "content": "A comment on the first post!", "created_at": "2021-11-09T17:04:51.895Z",
// "updated_at": "2021-11-09T17:04:51.895Z", "user": {"id": 1, "display_name": "Superman"}}], "meta": {"current_page": 1, "per_page": 30, "total_entries": 1} }
