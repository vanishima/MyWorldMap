import React from "react";
import PropTypes from "prop-types";

const Locate = ({ panTo }) => {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src="/icons/bi-compass-fill.svg" alt="compass - locate me" />
      <span className="tooltiptext"> Click to locate</span>
    </button>
  );
};

Locate.propTypes = {
  panTo: PropTypes.func,
};

export default Locate;
