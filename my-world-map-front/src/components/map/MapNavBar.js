import PropTypes from "prop-types";
import Search from "./Search";

const DEFAULT_FILTER_TAG = { value: "all", label: "All" };

const MapNavBar = (props) => {
  // const [authWarnShow, setAuthWarnShow] = useState(false);
  // const addBtnRef = useRef(null);

  const handleLabelClick = async (filterLabel) => {
    console.log(`${filterLabel} clicked`);
    props.setLabelsSelected(filterLabel);
    if (filterLabel !== DEFAULT_FILTER_TAG) {
      console.log("filter");
      props.drawPosts(props.setPosts, filterLabel, props.setLoadingPosts);
    } else {
      // props.setLabelsSelected(null);
      props.drawPosts(props.setPosts, null, props.setLoadingPosts);
    }
  };

  // const handleAddShow = async () => {
  //   const res = await myAuth.verifyAuth();
  //   if (res.valid) {
  //     // setEditShow(true);
  //     console.log("logged in");
  //   } else {
  //     console.log("handleAddShow message", res.msg);
  //     setAuthWarnShow(true);
  //     setTimeout(() => {
  //       setAuthWarnShow(false);
  //     }, 1000);
  //   }
  // };

  return (
    <div
      className="filter-buttons row center"
      style={{
        display: "flex",
      }}
    >
      <div className="col-7">
        {/*<button
        className="me-2 mb-2 btn col-auto label-button-filter"
        onClick={() => handleLabelClick(DEFAULT_FILTER_TAG)}
      >
        Latest
      </button>
      <button
        className="me-2 mb-2 btn col-auto label-button-filter"
        onClick={() => handleLabelClick(DEFAULT_FILTER_TAG)}
      >
        Closest
      </button>*/}

        {/*<div className="buttonDivider"></div>*/}

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
              className="me-2 btn col-auto label-button"
              key={label.label}
              onClick={() => handleLabelClick(label)}
            >
              <div>
                {label.icon_url && (
                  <img src={label.icon_url} alt={label.label + "button"}></img>
                )}
                <span> {label.label}</span>
              </div>
            </button>
          ))}
      </div>

      <div className="col-5">
        <Search
          isLoaded={props.isLoaded}
          panTo={props.panTo}
          mapRef={props.mapRef}
        />
      </div>

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
//<Search mapRef={props.mapRef}/>
MapNavBar.propTypes = {
  props: PropTypes.shape({
    labels: PropTypes.array,
    setLabelsSelected: PropTypes.func,
    setPosts: PropTypes.func,
    drawPosts: PropTypes.func,
    setLoadingPosts: PropTypes.func,
    mapRef: PropTypes.object,
  }),
};

export default MapNavBar;
