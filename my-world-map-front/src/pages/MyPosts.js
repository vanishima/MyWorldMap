import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { formatRelative } from "date-fns";

// Elements
import Layout from "../components/Layout";
import TextPreview from "../components/utils/TextPreview";

// API
import PostsAPI from "../api/PostsAPI";

// Styles
import "../stylesheets/myPosts.css";

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
        <h2>My Posts</h2>
        <Link to="/formNewBlog">
          <button className="btn btn-outline-success">Create new post</button>
        </Link>
        <div className="row">
          {posts &&
            posts.map((post, i) => (
              <Card key={post._id} className="mb-2 me-2 col-4 post-card">
                <Card.Body>
                  <Link
                    to={{ pathname: "/postDetails", search: "postID=" + post._id }}
                    className="none-style"
                  >
                    <Card.Title href="/">{post.title}</Card.Title>
                  </Link>
                  <small className="mb-2 text-muted">
                    Posted {formatRelative(new Date(post.date), new Date())}
                  </small>
                  <TextPreview rawText={post.content} />
                </Card.Body>
              </Card>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default MyPosts;
