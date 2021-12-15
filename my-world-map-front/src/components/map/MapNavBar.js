// import { useRef, useState } from "react";
import PropTypes from "prop-types";
// import { Overlay, Tooltip } from "react-bootstrap";

import Search from "./Search";
import LocateTo from "./LocateTo";
// import CreateFilterLabel from "../utils/CreateFilterLabel";
// import myAuth from "../../authStatus";

const DEFAULT_FILTER_TAG = { value: "all", label: "All" };

const MapNavBar = (props) => {
  // const [authWarnShow, setAuthWarnShow] = useState(false);
  // const [showAddLabel, setShowAddLabel] = useState(false);
  // const addBtnRef = useRef(null);

  const handleLabelClick = async (filterLabel) => {
    console.log(`${filterLabel} clicked`);
    props.setLabelsSelected(filterLabel);
    if (filterLabel !== DEFAULT_FILTER_TAG) {
      console.log("filter");
      props.drawPosts(props.setPosts, filterLabel, props.setLoadingPosts);
    } else {
      props.setLabelsSelected(null);
      props.drawPosts(props.setPosts, null, props.setLoadingPosts);
    }
  };

  // const handleAddShow = async () => {
  //   if (showAddLabel) {
  //     setShowAddLabel(false);
  //     return;
  //   }
  //   setShowAddLabel(true);
  // const res = await myAuth.verifyAuth();
  // if (res.valid) {
  //   setShowAddLabel(true);
  //   console.log("logged in");
  // } else {
  //   console.log("handleAddShow message", res.msg);
  //   setAuthWarnShow(true);
  //   setTimeout(() => {
  //     setAuthWarnShow(false);
  //   }, 1000);
  // }
  // };

  return (
    <div
      className="filter-buttons row center"
      style={{
        display: "flex",
      }}
    >
      <div className="col-6">
        <button
          className="me-2 btn col-auto label-button"
          onClick={() => handleLabelClick(DEFAULT_FILTER_TAG)}
          style={{ width: "40px" }}
        >
          All
        </button>
        {props.labels &&
          props.labels.map((label, i) => (
            <button
              className={`me-2 btn col-auto label-button ${
                props.labelsSelected &&
                label.value === props.labelsSelected.value
                  ? "label-selected"
                  : ""
              }`}
              key={label.label + i}
              onClick={() => handleLabelClick(label)}
            >
              <div>
                {label.icon_url && (
                  <img src={label.icon_url} alt={label.label + "button"}></img>
                )}
                <span>
                  {" "}
                  {label.label} ({label.count})
                </span>
              </div>
            </button>
          ))}
        {/*<button
          ref={addBtnRef}
          className="me-2 btn col-auto label-button"
          onClick={handleAddShow}
          style={{
            width: "110px",
            borderRadiu: "60px",
            alingItems: "center",
          }}
        >
          Add new
          <img
            src="./icons/add.png"
            alt="add label button"
            style={{ width: "20px" }}
          ></img>
        </button>
        <Overlay
          className="me-2"
          target={addBtnRef.current}
          show={showAddLabel}
          placement="right"
        >
          <div>
            <CreateFilterLabel
              options={props.labels}
              setCurrentLabel={props.setLabelsSelected}
              currentLabel={props.labelsSelected}
            />
          </div>
        </Overlay>*/}
      </div>

      <div className="col-5">
        <Search
          isLoaded={props.isLoaded}
          panTo={props.panTo}
          mapRef={props.mapRef}
        />
      </div>

      <div className="col-1 card center" style={{ border: "0" }}>
        <LocateTo
          panTo={props.panTo}
          scale={2}
          color={"var(--darkRed)"}
          text={"Locate Me"}
          text_position={"right"}
        ></LocateTo>
      </div>

      {/*<Overlay target={addBtnRef.current} show={authWarnShow} placement="right">
        {(props) => (
          <Tooltip id="authWarnOverlay" {...props}>
            Please register or login first!
          </Tooltip>
        )}
      </Overlay>*/}
    </div>
  );
};

MapNavBar.propTypes = {
  props: PropTypes.shape({
    labels: PropTypes.array,
    labelsSelected: PropTypes.object,
    setLabelsSelected: PropTypes.func,
    setPosts: PropTypes.func,
    drawPosts: PropTypes.func,
    setLoadingPosts: PropTypes.func,
    mapRef: PropTypes.object,
  }),
};

export default MapNavBar;
