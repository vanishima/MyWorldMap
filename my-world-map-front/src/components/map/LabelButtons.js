import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Overlay, Tooltip } from "react-bootstrap";
import myAuth from "../../authStatus";

const DEFAULT_FILTER_TAG = { value: "Filter", label: "Filter" };

const LabelButtons = (props) => {
  const [authWarnShow, setAuthWarnShow] = useState(false);
  const addBtnRef = useRef(null);

  const handleLabelClick = async (filterLabel) => {
    console.log(`${filterLabel} clicked`);
    if (filterLabel !== DEFAULT_FILTER_TAG) {
      console.log("filter");
      props.setLabelsSelected(filterLabel);
      props.drawPosts(props.setPosts, filterLabel);
    } else {
      props.setLabelsSelected(null);
      props.drawPosts(props.setPosts);
    }
  };

  const handleAddShow = async () => {
    const res = await myAuth.verifyAuth();
    if (res.valid) {
      // setEditShow(true);
      console.log("logged in");
    } else {
      console.log("handleAddShow message", res.msg);
      setAuthWarnShow(true);
      setTimeout(() => {
        setAuthWarnShow(false);
      }, 1000);
    }
  };

  return (
    <div
      className="overlay-middle filter-buttons row"
      style={{
        display: "flex",
        "alignItems": "center",
        "justifyContent": "center",
      }}
    >
      <button
        className="me-2 btn col-auto label-button"
        onClick={() => handleLabelClick(DEFAULT_FILTER_TAG)}
        style={{ width: "40px" }}
      >
        <div>
          <span>All</span>
        </div>
      </button>
      {props.labels &&
        props.labels.map((label, i) => (
          <button
            className="me-2 btn col-auto label-button"
            key={label.label}
            onClick={() => handleLabelClick(label)}
          >
            <div>
              {label.icon_url && <img src={label.icon_url} alt={label.label + "button"}></img>}
              <span> {label.label}</span>
            </div>
          </button>
        ))}
      {/*<button
        ref={addBtnRef}
        className="me-2 btn col-auto label-button"
        onClick={handleAddShow}
        style={{
          width: "40px",
          borderRadiu: "60px",
          alingItems: "center",
        }}
      >
        <img
          src="./icons/add.png"
          alt="add label button"
          style={{ width: "20px" }}
        ></img>
      </button>

      <Overlay target={addBtnRef.current} show={authWarnShow} placement="right">
        {(props) => (
          <Tooltip id="authWarnOverlay" {...props}>
            Please register or login first!
          </Tooltip>
        )}
      </Overlay>*/}
    </div>
  );
};

LabelButtons.propTypes = {
  props: PropTypes.shape({
    labels: PropTypes.array,
    setLabelsSelected: PropTypes.func,
    setPosts: PropTypes.func,
    drawPosts: PropTypes.func,
  }),
};

export default LabelButtons;
