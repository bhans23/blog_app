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
    <div className="App">
      <div className="main">
        <UserContext.Provider value={{ user, setUser }}>
        <Paper elevation={10}>
          <div className="nav">
           
              <Nav />
            
          </div>
          </Paper>
          <Paper elevation={10}>
            <Routes>
              <Route path="*" element={<Home />} />
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/createUser" element={<CreateUser />} />
              <Route path="/blog/*" element={<Blog />} />
            </Routes>
          </Paper>
        </UserContext.Provider>
      </div>
    </div>
  );
}

export default App;
