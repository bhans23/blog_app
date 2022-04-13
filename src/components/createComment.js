import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const COMMENT_URL = "/comments";

const CreateComment = ({ id}) => {
  const [state, setState] = useState({
    body: "",
    create: false,
  });
const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        COMMENT_URL,
        {
          comment: {
            post_id: id,
            content: state.body,
          },
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        response?.data
          ? setState({ ...setState, body: "" })
          : setState({ ...setState });

        setState({ body: "", create: false });
        navigate("/blog/posts/post", {state: {id:id}})
      });
  };

  return (
    <>
      {state.create ? (
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
            />
            <br />
            <input type="submit" value="Submit" />
          </form>
          <button onClick={() => setState({ ...state, create: false })}>
          Cancel
        </button>
        </>
      ) : (
        <button onClick={() => setState({ ...state, create: true })}>
          Comment
        </button>
      )}
    </>
  );
};

export default CreateComment;

// {"comment": {"post_id": 1, "content": "My interesting thought on your post..."}}
