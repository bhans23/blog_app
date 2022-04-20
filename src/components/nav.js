import { useEffect, useState, useContext } from "react";
import { UserContext } from "../api/UserContext.js";
import { Link, Navigate } from "react-router-dom";
import Button from "@mui/material/Button";

const Nav = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { user, setUser } = useContext(UserContext);
  const object = {};
  const string = "";

  const logOut = () => {
    localStorage.clear();
    setToken(localStorage.getItem("token"));
    setUser(false);
  };

  return (
    <>
      {!user ? (
        <div className="Nav">
          <Button className="button"  variant="contained" component={Link} to="/">
            Home
          </Button>
        </div>
      ) : (
        <div className="Nav">
          <Button className="button"  variant="contained" component={Link} to="/">
            Home
          </Button>
          <Button className="button" variant="contained" onClick={logOut}>
            Log Out
          </Button>
        </div>
      )}
    </>
  );
};

export default Nav;
