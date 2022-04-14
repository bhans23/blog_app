import { useState,useEffect } from "react";
import axios from "../api/axios";

import { useNavigate, Navigate, useLocation } from "react-router-dom";

const POSTS_URL = "/posts";

const EditPost = () => {
  const [state, setState] = useState({
    title: "",
    body: "",
    id: null,
    response: false
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(
        `${POSTS_URL}/${id}`,
        { post: { title: state.title, body: state.body } },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        
        setState({ ...state, id: response.data.post.id,response: true });
      });
    setState({
      title: "",
      body: "",
    });
  };
  useEffect(() => {

    axios.get(`${POSTS_URL}/${id}`).then((response) => {
      const { post } = response.data;
      setState({
        ...state,
        title: post.title,
        body: post.body,
        id: post.id
        
      });
    });
  }, []);

  return state.response ? (
    <Navigate to="../posts/post" state={{id: state.id}}/>
  ) : (
    <>
   
      <h1>Edit Post</h1>

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

export default EditPost;
