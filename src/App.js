import Nav from "./components/nav.js";
import Home from "./components/home.js";
import SignIn from "./components/signIn.js";
import CreateUser from "./components/createUser.js";
import Blog from "./components/blog.js";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { UserContext } from "./api/UserContext.js";
import { useState } from "react";
import Paper from "@mui/material/Paper";

function App() {
  const [user, setUser] = useState(false);
  return (
    <div className="mainApp">
      <UserContext.Provider value={{ user, setUser }}>
        <Paper elevation={10}>
          <div className="nav">
            <Nav />
          </div>
        </Paper>
        <Paper elevation={10}>
          <div className="App">
            <Routes>
              <Route path="*" element={<Home />} />
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/createUser" element={<CreateUser />} />
              <Route path="/blog/*" element={<Blog />} />
            </Routes>
          </div>
        </Paper>
      </UserContext.Provider>
    </div>
  );
}

export default App;
