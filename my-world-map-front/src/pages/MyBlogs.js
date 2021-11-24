import Layout from "../components/Layout";
import { Link } from "react-router-dom";

const MyBlogs = () => {
  return (
    <Layout>
      <div className="container">
        <h2>My blogs</h2>
        <Link to="/formNewBlog">
          <button className="btn btn-outline-success">Create new blog</button>
        </Link>
      </div>
    </Layout>
  );
};

export default MyBlogs;
