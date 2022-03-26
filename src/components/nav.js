import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="Nav">
      <Link to="/">Home</Link>
      <Link to="/signIn">Sign In</Link>
      <Link to="/createUser">Create User</Link>
      <Link to="/blog">Blog</Link>
    </div>
  );
};

export default Nav;
