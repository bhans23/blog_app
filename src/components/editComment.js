import { useEffect, useState } from "react";
import axios from "../api/axios";

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
            <input type="submit" value="Submit" />
          </form>
          <button onClick={() => setState({ ...state, edit: false })}>
            Cancel
          </button>
        </>
      ) : (
        <>
         <p>{state.body}</p>
        <button onClick={() => setState({ ...state, edit: true})}>
            Edit
          </button>
        </>
      )}
    </>
  );
};

export default EditComment;

// {"comment": {"contents": "My comment edited"}}
