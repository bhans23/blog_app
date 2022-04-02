import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const Nav = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const object = {};
  const string = "";

  const logOut = () => {
    localStorage.clear();
    setToken(localStorage.getItem("token"));
    window.location.reload();
    return (
      <>
        <Navigate to="/" />
        {/* <Link to="/">Home</Link> */}
      </>
    );
  };
  const menu = () => {
    if (token === null) {
      return (
        <div className="Nav">
          <Link to="/">Home</Link>
        </div>
      );
    } else {
      return (
        <div className="Nav">
          <Link to="/">Home</Link>
          <button onClick={logOut}>Log Out</button>
          <Link to="/blog">Blog</Link>
        </div>
      );
    }
  };

  return <>{menu()}</>;
};

export default Nav;
