import { useEffect, useState } from "react";
import axios from "../api/axios";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";

const COMMENT_URL = "/comments";

const EditComment = ({ cmtId, body }) => {
  const [state, setState] = useState({
    body: body,
    edit: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.patch(
      `${COMMENT_URL}/${cmtId}`,
      { comment: { contents: body } },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    setState({ ...state, edit: false });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <>
      {state.edit ? (
        <>
          <form onSubmit={handleSubmit}>
            <label htmlFor="content">Comment</label>
            <br />
            <textarea
              cols="40"
              rows="5"
              type="body"
              id="body"
              name="body"
              value={state.body}
              required
              onChange={handleChange}
            >
              {state.body}
            </textarea>
            <br />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
          <Button onClick={() => setState({ ...state, edit: false })}>
            <CancelIcon />
          </Button>
        </>
      ) : (
        <>
          <p>{state.body}</p>
          <Button onClick={() => setState({ ...state, edit: true })}>
            <EditIcon />
          </Button>
        </>
      )}
    </>
  );
};

export default EditComment;

// {"comment": {"contents": "My comment edited"}}
