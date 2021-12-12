import { useEffect, useState } from "react";

// Elements
import Layout from "../components/Layout";
import PostsList from "../components/PostsList";
import Pagination from "../components/Pagination";

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
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    console.log("### EFFECT ###");
    drawPosts(setPosts, setLoading);
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <div className="container">
        <h1>Posts</h1>

        <PostsList posts={currentPosts} loading={loading} />
        
        <Pagination
          pageSize={postsPerPage}
          totalCount={posts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </Layout>
  );
};

export default MyPosts;
