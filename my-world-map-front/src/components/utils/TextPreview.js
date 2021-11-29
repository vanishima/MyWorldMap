import React from "react";
import PropTypes from "prop-types";

const MAX_TEXT = 40;

const TextPreview = ({rawText}) => {
  const text =
    rawText.length < MAX_TEXT
      ? rawText
      : rawText.substring(0, MAX_TEXT) + "...";
  return <div>{text}</div>;
};

TextPreview.propTypes = {
  rawText: PropTypes.string,
};

export default TextPreview;
