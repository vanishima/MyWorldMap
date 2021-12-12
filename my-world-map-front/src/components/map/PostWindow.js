import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Button, Offcanvas, Overlay, Tooltip } from "react-bootstrap";
import { InfoWindow } from "@react-google-maps/api";
import { formatRelative } from "date-fns";

import FormEditPost from "../FormEditPost";
import myAuth from "../../authStatus";

const PostWindow = ({ selected, post, setPostSelected, setSelected, panTo, labels }) => {
  const [editShow, setEditShow] = useState(false);
  const writeBtnRef = useRef(null);
  const [authWarnShow, setAuthWarnShow] = useState(false);

  const lat = selected ? selected.lat : post.location.lat;
  const lng = selected ? selected.lng : post.location.lng;
  const date = selected ? selected.time : new Date(post.date);

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

  return (
    <div>
      <InfoWindow
        position={{
          lat: lat,
          lng: lng,
        }}
        onCloseClick={() => {
          if (setSelected) setSelected(null);
          if (setPostSelected) setPostSelected(null);
          setAuthWarnShow(false)
        }}
      >
        <div>
          <h2>{selected ? "New post" : post.title}</h2>
          <p>Created {formatRelative(date, new Date())}</p>
          <Button
            ref={writeBtnRef}
            variant="outline-primary"
            onClick={handleEditShow}
            className="px-2"
          >
            {post ? "Edit" : "Create new post"}
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
              {selected ? (
                <FormEditPost
                  location={selected}
                  panTo={panTo}
                  labels={labels}
                />
              ) : (
                <FormEditPost post={post} panTo={panTo} labels={labels} />
              )}
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </InfoWindow>
    </div>
  );
};

PostWindow.propTypes = {
  selected: PropTypes.object,
  post: PropTypes.object,
  setSelected: PropTypes.func,
  setPostSelected: PropTypes.func,
  panTo: PropTypes.func,
  label: PropTypes.array,
};

export default PostWindow;
