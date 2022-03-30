import Nav from "./components/nav.js";
import Home from "./components/home.js";
import SignIn from "./components/signIn.js";
import CreateUser from "./components/createUser.js";
import Blog from "./components/blog.js";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="App">
        <Nav />
      </div>

      <div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/blog/*" element={<Blog />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
