import { useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyPosts from "./pages/MyPosts";
import MapPosts from "./pages/MapPosts";
import User from "./pages/User";
// import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails";

import myAuth from "./authStatus";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  useEffect(() => {
    return () => {
      myAuth.verifyAuth();
    };
  }, []);

  return (
    <Router>
      <div className="App"></div>
      <Routes>
        <Route path="/" element={<MapPosts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/myposts" element={<MyPosts />} />
        <Route path="/mapposts" element={<MapPosts />} />
        <Route path="/user" element={<User />} />
        <Route path="/postdetails" element={<PostDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
