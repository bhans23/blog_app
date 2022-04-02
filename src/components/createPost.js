import { useState } from "react";
import axios from "../api/axios";

const POSTS_URL = "/posts";

const CreatePost = () => {
  const [state, setState] = useState({
    title: "",
    body: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        POSTS_URL,
        { post: { title: state.title, body: state.body } },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response);
      });
    setState({
      title: "",
      body: "",
    });
  };
  return (
    <>
      {console.log(state)}
      <h1>Create Post</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <br />
        <input
          type="title"
          id="title"
          name="title"
          value={state.title}
          required
          onChange={handleChange}
        />
        <br />
        <label htmlFor="body">Body</label>
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
    </>
  );
};

export default CreatePost;
