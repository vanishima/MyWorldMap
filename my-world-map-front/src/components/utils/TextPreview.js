import React from "react";
import PropTypes from "prop-types";

const MAX_TEXT = 50;

const TextPreview = ({ rawText, fontSize, maxText }) => {
  maxText = maxText ? maxText : MAX_TEXT;
  const text =
    rawText.length < MAX_TEXT ? rawText : rawText.substring(0, maxText) + "...";
  return <div style={{ fontSize: fontSize }}>{text}</div>;
};

TextPreview.propTypes = {
  rawText: PropTypes.string,
  fontSize: PropTypes.string,
  maxText: PropTypes.number,
};

export default TextPreview;
