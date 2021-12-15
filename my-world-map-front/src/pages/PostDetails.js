import { useState, useEffect, useRef } from "react";
import { formatRelative } from "date-fns";
import { Offcanvas, Tooltip, Overlay } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Elements
import Layout from "../components/Layout";
import EmbeddedMap from "../components/map/EmbeddedMap";
import FormEditPost from "../components/FormEditPost";

// API
import PostsAPI from "../api/PostsAPI";
// import fetchLabels from "../components/utils/fetchLabels";
import fetchLabelCounts from "../components/utils/fetchLabelCounts";
import myAuth from "../authStatus";
import { fetchPost } from "../components/utilFunctions";

// Styles
import "../stylesheets/myPosts.css";

const PostDetails = () => {
  const editBtnRef = useRef(null);
  const [editShow, setEditShow] = useState(false);
  const [authWarnShow, setAuthWarnShow] = useState(false);
  const [labels, setLabels] = useState(null);
  const [post, setPost] = useState({});
  const [belongsToUser, setBelongsToUser] = useState(false);

  const navigate = useNavigate();

  console.log("PostDetails:", post);

  const handleClose = () => setEditShow(false);
  const handleEditShow = async () => {
    const res = await myAuth.verifyAuth();
    if (res.valid) {
      setEditShow(true);
    } else {
      console.log("handleEditShow message", res.msg);
      setAuthWarnShow(true);
    }
  };

  const handleDelete = async (evt) => {
    evt.preventDefault();
    console.log("trying to delete", post);
    const res = await myAuth.verifyAuth();
    if (res.valid) {
      const resRaw = await PostsAPI.deletePost(post);
      const res = await resRaw.json();

      if (resRaw.ok) {
        console.log("successfully deleted post");
        navigate("/mapposts");
      } else {
        console.log("Failed to post", res.msg);
      }
    } else {
      console.log("handleEditShow message", res.msg);
      setAuthWarnShow(true);
    }
  };

  useEffect(() => {
    console.log("### EFFECT ###");
    fetchPost(setPost, setBelongsToUser);
    fetchLabelCounts(setLabels);
  }, []);

  console.log("rendering");
  return (
    <Layout>
      <div className="container post-detail center mt-3 ">
        <div className="row">
          <h1 className="mb-2 col-auto">{post.title}</h1>
          {belongsToUser && (
            <div>
              <button
                ref={editBtnRef}
                onClick={handleEditShow}
                className="btn btn-outline-primary col-auto me-2"
              >
                Edit
              </button>

              <button
                className="btn btn-outline-danger col-auto"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          )}
        </div>
        <small className="mb-3 text-muted">
          Posted{" "}
          {post.date && post.date.length > 17
            ? formatRelative(new Date(post.date), new Date())
            : post.date}
        </small>
        <div className="my-2" style={{ whiteSpace: "pre-line" }}>
          {post.content}
        </div>

        <br />
        {post.location && <EmbeddedMap location={post.location} />}

        <Overlay
          target={editBtnRef.current}
          show={authWarnShow}
          placement="right"
        >
          {(props) => (
            <Tooltip id="authWarnOverlay" {...props}>
              Please register or login first!
            </Tooltip>
          )}
        </Overlay>

        <Offcanvas
          show={editShow}
          onHide={handleClose}
          scroll={false}
          backdrop={false}
          placement={"end"}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Edit Post</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <FormEditPost post={post} labels={labels} />
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </Layout>
  );
};

export default PostDetails;
