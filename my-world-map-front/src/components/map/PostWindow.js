import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Button, Offcanvas, Overlay, Tooltip } from "react-bootstrap";
import { InfoWindow } from "@react-google-maps/api";
import { formatRelative } from "date-fns";

import FormEditPost from "../FormEditPost";
import myAuth from "../../authStatus";

const PostWindow = ({ post, setPostSelected, panTo, labels }) => {
  const [editShow, setEditShow] = useState(false);
  const writeBtnRef = useRef(null);
  const [authWarnShow, setAuthWarnShow] = useState(false);

  const handleClose = () => setEditShow(false);
  const handleEditShow = async () => {
    const res = await myAuth.verifyAuth();
    // console.group("handleEditShow",res);
    if (res.valid) {
      // if logged in
      setEditShow(true);
    } else {
      console.log("handleEditShow message", res.msg);
      setAuthWarnShow(true);
    }
    // console.groupEnd();
  };

  return (
    <div>
      <InfoWindow
        position={{ lat: post.location.lat, lng: post.location.lng }}
        onCloseClick={() => {
          console.log("InfoWindow close click");
          setPostSelected(null);
        }}
      >
        <div>
          <h4>{post.title}</h4>
          <p>Created {formatRelative(new Date(post.date), new Date())}</p>
          <Button
            ref={writeBtnRef}
            variant="primary"
            onClick={handleEditShow}
            className="px-2"
          >
            Edit
          </Button>

          <Overlay
            target={writeBtnRef.current}
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
            backdrop={true}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Edit Post</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <FormEditPost post={post} panTo={panTo} labels={labels} />
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </InfoWindow>
    </div>
  );
};

PostWindow.propTypes = {
  post: PropTypes.object,
  setPostSelected: PropTypes.func,
  panTo: PropTypes.func,
  label: PropTypes.array,
};

export default PostWindow;
