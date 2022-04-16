import Nav from "./components/nav.js";
import Home from "./components/home.js";
import SignIn from "./components/signIn.js";
import CreateUser from "./components/createUser.js";
import Blog from "./components/blog.js";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { UserContext } from "./api/UserContext.js";
import {useState} from "react"


function App() {

  const [user,setUser] = useState(false)
  return (
    <div className="App">
      <div className="App"></div>
      <UserContext.Provider value={{user,setUser}}>
        <Nav />

        <div>
          <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/createUser" element={<CreateUser />} />
            <Route path="/blog/*" element={<Blog />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
