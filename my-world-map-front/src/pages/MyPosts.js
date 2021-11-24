import {useEffect, useState} from "react";
import { Link } from "react-router-dom";

// Elements
import Layout from "../components/Layout";

// API
import PostsAPI from "../api/PostsAPI";

async function drawPosts(setPosts) {
  const resRaw = await PostsAPI.getPosts();
  const res = await resRaw.json();
  await setPosts(res.posts);
}

const MyPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("### EFFECT ###");
    drawPosts(setPosts);
  }, []);

  return (
    <Layout>
      <div className="container">
        <h2>My blogs</h2>
        <Link to="/formNewBlog">
          <button className="btn btn-outline-success">Create new post</button>
        </Link>

        {posts &&
          posts.map((post, i) => (
            <div key={i}>{post.title}</div>
          ))}

      </div>
    </Layout>
  );
};

export default MyPosts;
