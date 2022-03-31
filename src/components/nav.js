import { useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const object = {};
  const string = "";

  const logOut = () => {
    localStorage.clear();
    setToken(localStorage.getItem("token"));
    window.location.reload()
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

  return (
    <>
      {console.log(typeof token)}
      {console.log(token)}
      {menu()}
    </>
  );
};

export default Nav;
