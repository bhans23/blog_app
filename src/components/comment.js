import { useState, useEffect } from "react";

const Comment = ({ cmt }) => {
  const [state, setState] = useState({
    content: cmt.content,
    created: cmt.created_at,
    updated: "",
    user: cmt.user.display_name,
  });

  return (
    <>
      <p>{state.user}</p>
      <p>{state.created}</p>
      <p>{state.content}</p>
      <br/>
    </>
  );
};

export default Comment;

// {"comments": [{"id": 1, "content": "A comment on the first post!", "created_at": "2021-11-09T17:04:51.895Z",
// "updated_at": "2021-11-09T17:04:51.895Z", "user": {"id": 1, "display_name": "Superman"}}], "meta": {"current_page": 1, "per_page": 30, "total_entries": 1} }
