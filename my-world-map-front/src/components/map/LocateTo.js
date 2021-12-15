import React from "react";
import PropTypes from "prop-types";

const LocateTo = ({
  panTo,
  location,
  scale = 1,
  color = "currentColor",
  text,
  text_position,
}) => {
  if (!location) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      },
      () => null
    );
  }

  return (
    <button
      className="locateTo row vertical-center"
      onClick={() => panTo(location)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={scale * 16}
        height={scale * 16}
        fill={color}
        className="bi bi-geo-alt"
        viewBox="0 0 16 16"
      >
        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
      </svg>
      <small className="left">{text}</small>
    </button>
  );
};

LocateTo.propTypes = {
  panTo: PropTypes.func.isRequired,
  location: PropTypes.object,
  scale: PropTypes.number,
  color: PropTypes.string,
  text: PropTypes.string,
  text_position: PropTypes.string,
};

export default LocateTo;
