import { useState, useEffect } from "react";
import convertDate from "../api/convertDate.js";
import EditComment from "./editComment.js";
import axios from "../api/axios";
import Card from "@mui/material/Card";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";

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
          
            <Card variant="outlined">
              <p>By: {state.user}</p>
              <p>Posted: {convertDate(state.created)}</p>
              <EditComment cmtId={cmt.id} body={cmt.content} />
              <Button onClick={() => deleteComment()}><DeleteForeverIcon/></Button>
            </Card>
         
        </>
      );
    } else {
      return (
       
          <Card variant="outlined">
            <div className="comment">
              <p>By: {state.user}</p>
              <p>Posted: {convertDate(state.created)}</p>
            </div>

            <p>{state.content}</p>
            <br />
          </Card>
       
      );
    }
  };

  return <>{userOptions()}</>;
};

export default Comment;

// {"comments": [{"id": 1, "content": "A comment on the first post!", "created_at": "2021-11-09T17:04:51.895Z",
// "updated_at": "2021-11-09T17:04:51.895Z", "user": {"id": 1, "display_name": "Superman"}}], "meta": {"current_page": 1, "per_page": 30, "total_entries": 1} }
