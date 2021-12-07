import React from "react";
import PropTypes from "prop-types";
import CreatableSelect from "react-select/creatable";
// import { ActionMeta, OnChangeValue } from "react-select";

// interface ColourOption {
//   value: string;
//   label: string;
//   color: string;
// isFixed?: boolean;
// isDisabled?: boolean;
// }

// const colourOptions = [
//   { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
//   { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
//   { value: "purple", label: "Purple", color: "#5243AA" },
//   { value: "red", label: "Red", color: "#FF5630", isFixed: true },
//   { value: "orange", label: "Orange", color: "#FF8B00" },
//   { value: "yellow", label: "Yellow", color: "#FFC400" },
//   { value: "green", label: "Green", color: "#36B37E" },
//   { value: "forest", label: "Forest", color: "#00875A" },
//   { value: "slate", label: "Slate", color: "#253858" },
//   { value: "silver", label: "Silver", color: "#666666" },
// ];

// const CreatableSelectLabel = (props) => {
//   const handleChange = (
//     newValue: OnChangeValue<ColourOption, false>,
//     actionMeta: ActionMeta<ColourOption>
//   ) => {
//     console.group("Value Changed");
//     console.log(newValue);
//     console.log(`action: ${actionMeta.action}`);
//     console.groupEnd();
//   };

//   const handleInputChange = (inputValue: any, actionMeta: any) => {
//     console.group("Input Changed");
//     console.log(inputValue);
//     console.log(`action: ${actionMeta.action}`);
//     console.groupEnd();
//   };

//   return (
//     <CreatableSelect
//       name="test_label"
//       isClearable
//       onChange={handleChange}
//       onInputChange={handleInputChange}
//       options={colourOptions}
//     />
//   );
// };

const CreatableSelectLabel = (props) => {
  const currentLabel = props.currentLabel;
  // console.group("CreatableSelectLabel", currentLabel);
  // console.log(typeof currentLabel + "currentLabel", currentLabel);
  const defaultValue =
    typeof currentLabel === "object"
      ? currentLabel
      : { value: "orange", label: "Orange", color: "#FF8B00" };
  // console.log("defaultValue", defaultValue);
  // console.groupEnd();

  // const defaultValue = { value: "orange", label: "Orange", color: "#FF8B00" };
  const handleChange = (newValue, actionMeta) => {
    console.group("Value Changed");
    console.log(newValue);
    console.log(newValue.value.toLowerCase());
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    props.setCurrentLabel(newValue);
  };

  const handleInputChange = (inputValue: any, actionMeta: any) => {
    console.group("Input Changed");
    console.log("inputValue", inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  return (
    <CreatableSelect
      name="test_label"
      isClearable
      onChange={handleChange}
      onInputChange={handleInputChange}
      options={props.options}
      defaultValue={defaultValue}
    />
  );
};

CreatableSelectLabel.propTypes = {
  props: PropTypes.shape({
    currentLabel: PropTypes.object,
    setCurrentLabel: PropTypes.func,
  }),
};

export default CreatableSelectLabel;
