import { useState } from "react";

const CreatePost = () => {
  const setState = useState({
    title: "",
    body: "",
  });

  const handleChange = () => {};
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <h1>Create Post</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <br />
        <input
          type="title"
          id="title"
          name=""
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
