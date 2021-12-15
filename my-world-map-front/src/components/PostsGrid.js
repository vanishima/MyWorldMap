import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { formatRelative } from "date-fns";

// Elements
import TextPreview from "../components/utils/TextPreview";
import LocateTo from "../components/map/LocateTo";

const PostsGrid = ({ posts, panTo }) => {
  return (
    <div className="mb-4">
      {posts.map((post, i) => (
        <div className="card-group mb-2" key={i}>
          <Link
            to={{
              pathname: "/postDetails",
              search: "postID=" + post._id,
            }}
            className="none-style col-9"
            target="_blank"
          >
            <div className="card">
              <div className="card-body">
                <h2 className="card-title" style={{ fontSize: "15px" }}>
                  {post.title ? post.title : "(no title)"}
                </h2>
                <div className="card-text" style={{ fontSize: "10px" }}>
                  <span className="text-muted">
                    Posted {formatRelative(new Date(post.date), new Date())}
                  </span>{" "}
                  {post.label.label ? post.label.label : post.label}
                </div>
                <TextPreview
                  className="card-text"
                  rawText={post.content}
                  fontSize={"12px"}
                  maxText={47}
                />
              </div>
            </div>
          </Link>
          <div className="card center">
            <LocateTo
              panTo={panTo}
              location={post.location}
              scale={1.5}
              text={"Click to Locate"}
              text_poistion={"bottom"}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
// <div className="row">
//           <Link
//             to={{
//               pathname: "/postDetails",
//               search: "postID=" + post._id,
//             }}
//             className="none-style col-9"
//             target="_blank"
//           >
//             <li key={post._id} className="list-group-item mb-2">
//               <h2 style={{ fontSize: "15px" }}>
//                 {post.title ? post.title : "(no title)"}
//               </h2>

//               <div className="text-muted" style={{ fontSize: "10px" }}>
//                 Posted {formatRelative(new Date(post.date), new Date())}
//               </div>
//               <div className="row">
//                 <div className="col-10">
//                   <TextPreview
//                     rawText={post.content}
//                     fontSize={"12px"}
//                     maxText={47}
//                   />
//                 </div>
//               </div>
//             </li>
//           </Link>
//           <div className="col-3 right">
//             <LocateTo
//               panTo={panTo}
//               location={post.location}
//               scale={1.5}
//               text={"Click to locate"}
//             />
//           </div>
//         </div>

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
