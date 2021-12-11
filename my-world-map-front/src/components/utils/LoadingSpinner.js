import React from "react";
// import PropTypes from "prop-types";

const LoadingSpinner = (props) => {
  // console.log("LoadingSpinner", props.loadingPosts);
  // if (!props.loadingPosts) {
  //   return <div></div>;
  // }

  return (
    <div
      className="overlay text-center center"
      style={{
        marginTop: "2rem",
        // left: "50%"
        width: "50%",
        // margin: "50%"
      }}
    >
      <div className="spinner-border" role="status"></div>
    </div>
  );
};

// LoadingSpinner.propTypes = {
//   loadingPosts: PropTypes.bool,
// };

export default LoadingSpinner;
