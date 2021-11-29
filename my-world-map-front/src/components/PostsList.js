import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { formatRelative } from "date-fns";

// Elements
import TextPreview from "../components/utils/TextPreview";

const PostsList = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading</h2>;
  }

  return (
    <ul className="list-group mb-4">
      {posts.map((post) => (
        <li key={post._id} className="list-group-item mb-2">
        <Link
          to={{
            pathname: "/postDetails",
            search: "postID=" + post._id,
          }}
          className="none-style"
        >
        <h4>{post.title}</h4>
        </Link>
          
          <small className="text-muted">
            Posted {formatRelative(new Date(post.date), new Date())}
          </small>
          <TextPreview rawText={post.content} />
        </li>
      ))}
    </ul>
  );
};

PostsList.propTypes = {
  props: PropTypes.shape({
    posts: PropTypes.array,
    loading: PropTypes.bool,
  })
};

// {posts &&
//   posts.map((post, i) => (
//     <Card key={post._id} className="mb-2 me-2 col-3 post-card">
//       <Card.Body>
//         <Link
//           to={{
//             pathname: "/postDetails",
//             search: "postID=" + post._id,
//           }}
//           className="none-style"
//         >
//           <Card.Title href="/">{post.title}</Card.Title>
//         </Link>
//         <small className="mb-2 text-muted">
//           Posted {formatRelative(new Date(post.date), new Date())}
//         </small>
//         <TextPreview rawText={post.content} />
//       </Card.Body>
//     </Card>
//   ))}
// }

export default PostsList;
