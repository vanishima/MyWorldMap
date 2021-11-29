import React, { useState } from "react";
import PropTypes from "prop-types";
import { Dropdown, FormControl } from "react-bootstrap";

import drawPosts from "../utils/drawPosts";

const DEFAULT_FILTER_TAG = {value: "Filter", label: "Filter"};

const PostFilterBox = (props) => {
  console.group("PostFilterBox");
  const labels = props.labels;
  console.log("labels:", labels);
  const setLabelsSelected = props.setLabelsSelected;
  const [filterTag, setFilterTag] = useState(DEFAULT_FILTER_TAG);
  console.groupEnd();

  // The forwardRef is important!!
  // Dropdown needs access to the DOM node in order to position the Menu
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <button
      className="btn btn-light"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      style={{width:"max-content"}}
    >
      {children}
      &#x25bc;
    </button>
  ));

  // forwardRef again here!
  // Dropdown needs access to the DOM of the Menu to measure it
  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      const [value, setValue] = useState("");
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <FormControl
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder={labels ? "Type to filter..." : "Log in to see filters..."}
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );

  const handleFilterClick = (type) => {
    console.group("handleFilterClick");
    console.log(type, "filter clicked");
    setFilterTag(type);
    if (type !== DEFAULT_FILTER_TAG) {
      setLabelsSelected(type);
      drawPosts(props.setPosts, type);
    } else {
      setLabelsSelected(null);
      drawPosts(props.setPosts);
    }
    console.groupEnd();
  };

  return (
    <Dropdown className="post-filter">
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        {filterTag.label}
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu}>
        <Dropdown.Item onClick={() => handleFilterClick(DEFAULT_FILTER_TAG)}>
          All
        </Dropdown.Item>
        {labels &&
          labels.map((label, i) => (
            <Dropdown.Item
              key={i}
              eventKey={i}
              onClick={() => handleFilterClick(label)}
            >
              {label.label}
            </Dropdown.Item>
          ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

//  <Form.Check
//   type="checkbox"
//   label={label}
//   onClick={handleFilterCheckBox}
// />
// <Dropdown.Item eventKey="1">Red</Dropdown.Item>
//         <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
//         <Dropdown.Item eventKey="3" active>
//           Orange
//         </Dropdown.Item>
//         <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>

PostFilterBox.propTypes = {
  props: PropTypes.shape({
    labels: PropTypes.array,
    setLabelsSelected: PropTypes.func,
    setPosts: PropTypes.func,
  }),
};

export default PostFilterBox;
