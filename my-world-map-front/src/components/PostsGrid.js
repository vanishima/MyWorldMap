import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { formatRelative } from "date-fns";

// Elements
import TextPreview from "../components/utils/TextPreview";
import LocateTo from "../components/map/LocateTo";

const PostsGrid = ({ posts, panTo }) => {

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
            target="_blank"
          >
            <h2 style={{ fontSize: "15px" }}>{post.title ? post.title : "(no title)"}</h2>
          </Link>

          <div className="text-muted" style={{ fontSize: "10px" }}>
            Posted {formatRelative(new Date(post.date), new Date())}
          </div>
          <div className="row">
            <div className="col-10">
              <TextPreview
                rawText={post.content}
                fontSize={"12px"}
                maxText={47}
              />
            </div>
            <div className="col-2 right">
              <LocateTo panTo={panTo} location={post.location} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

PostsGrid.propTypes = {
  props: PropTypes.shape({
    posts: PropTypes.array,
    panTo: PropTypes.func,
    // setPostSelected: PropTypes.func
  }),
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

export default PostsGrid;
