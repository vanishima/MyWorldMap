import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyBlogs from "./pages/MyBlogs";
import MyGallery from "./pages/MyGallery";
import MyMap from "./pages/Map";
import User from "./pages/User";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Main page</h1>
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/myblogs" element={<MyBlogs />} />
        <Route path="/myphotos" element={<MyGallery />} />
        <Route path="/map" element={<MyMap />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
  );
}
// <Header />
// <Footer />
export default App;
