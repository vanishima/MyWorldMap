import React from "react";
import PropTypes from "prop-types";
import CreatableSelect from "react-select/creatable";

// function createLabel(newLabel){
//   // currentLabel.value = currentLabel.value.toLowerCase();
//   const exists = labels
//     ? labels.find((label) => label.value === currentLabel.value)
//     : false;
//   // check if need to create new label
//   if (!exists) {
//     currentLabel.value = currentLabel.value.toLowerCase();
//     const addLabelResRaw = await UserAPI.addLabel(currentLabel);
//     console.log("addLabelResRaw:", addLabelResRaw);
//     const addLabelRes = await addLabelResRaw.json();
//     if (!addLabelRes.valid) {
//       console.log(addLabelRes);
//       console.log("Failed to add new label:", addLabelRes.msg);
//       return;
//     }
//   } else {
//     setCurrentLabel(exists);
//   }
// }

const CreateFilterLabel = (props) => {
  const currentLabel = props.currentLabel;
  console.group("CreateFilterLabel", currentLabel);
  console.log(typeof currentLabel + "currentLabel", currentLabel);
  const defaultValue =
    typeof currentLabel === "object"
      ? currentLabel
      : { value: "Memo", label: "Memo", color: "#FF8B00" };
  console.log("defaultValue", defaultValue);
  console.groupEnd();

  const handleChange = (newValue, actionMeta) => {
    console.group("Value Changed");
    console.log(newValue);
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

CreateFilterLabel.propTypes = {
  props: PropTypes.shape({
    currentLabel: PropTypes.object,
    setCurrentLabel: PropTypes.func,
  }),
};

export default CreateFilterLabel;
