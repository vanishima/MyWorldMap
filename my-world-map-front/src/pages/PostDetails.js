import { useState, useEffect } from "react";
import { formatRelative } from "date-fns";

// Elements
import Layout from "../components/Layout";

// API
import PostsAPI from "../api/PostsAPI";

// Styles
import "../stylesheets/myPosts.css";

async function drawPost(setPost) {
  const url = new URL(window.location);
  const postID = url.searchParams.get("postID");
  console.log("PostDetails:", postID);
  const resRaw = await PostsAPI.getPostByID(postID);
  const res = await resRaw.json();
  const post = res.posts[0];
  post.contentStr = post.content.replace(/\n/g, "<br>");
  await setPost(post);
}

const PostDetails = () => {
  const [post, setPost] = useState({});
  useEffect(() => {
    console.log("### EFFECT ###");
    drawPost(setPost);
  }, []);

  console.log("PostDetails:", post);

  console.log("rendering");
  return (
    <Layout>
      <div className="container post-detail center mt-3 ">
        <h4 className="mb-2">{post.title}</h4>
        <small className="mb-3 text-muted">
          Posted{" "}
          {post.date && post.date.length > 17
            ? formatRelative(new Date(post.date), new Date())
            : post.date}
        </small>
        <div className="my-2" style={{ whiteSpace: "pre-line" }}>
          {post.content}
        </div>
      </div>
    </Layout>
  );
};

export default PostDetails;
