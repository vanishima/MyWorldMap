import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import PropTypes from "prop-types";

// Elements
import CreatableSelectLabel from "./utils/CreatableSelectLabel";

// API
import PostsAPI from "../api/PostsAPI";
import UserAPI from "../api/UserAPI";

const DEFAULT_LABEL = { value: "memo", label: "memo", color: "#00B8D9" };

/* Return ISO String in local time */
function isoDateWithoutTimezone(date) {
  if (date == null) return date;
  let timestamp = date.getTime() - date.getTimezoneOffset() * 60000;
  let correctDate = new Date(timestamp);
  return correctDate.toISOString();
}

const FormEditPost = ({ location, post, panTo, labels }) => {
  const [title, setTitle] = useState(post ? post.title : "");
  const [date, setDate] = useState(
    post
      ? new Date(post.date).toISOString().slice(0, -3)
      : isoDateWithoutTimezone(location.time).slice(0, -3)
  );
  const [content, setContent] = useState(post ? post.content : "");
  const [isPrivate, setIsPrivate] = useState(
    post && post.isPrivate ? true : false
  );

  if (post && post.label && typeof post.label !== "object") {
    post.label = { value: post.label, label: post.label, color: "#00B8D9" };
  }
  let tempLabel;
  if (post && post.label) {
    tempLabel = post.label;
  } else if (labels) {
    tempLabel = labels[0];
  } else {
    tempLabel = DEFAULT_LABEL;
  }
  const [currentLabel, setCurrentLabel] = useState(tempLabel);
  const oldLabelVal = currentLabel ? currentLabel.value : null;

  const navigate = useNavigate();

  const handleCheckBox = () => {
    console.log("isPrivate before", isPrivate);
    const temp = isPrivate;
    setIsPrivate(!temp);
    console.log("isPrivate after", isPrivate);
  };

  console.log(post);

  const handleDelete = async (evt) => {
    evt.preventDefault();
    console.log("trying to delete", post);
    const resRaw = await PostsAPI.deletePost(post);
    const res = await resRaw.json();

    if (resRaw.ok) {
      console.log("successfully deleted post");
      alert("Deletion successful!");
      navigate(0);
    } else {
      console.log("Failed to post", res.msg);
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.group("handleSubmit");

    // currentLabel.value = currentLabel.value.toLowerCase();
    const exists = labels
      ? labels.find((label) => label.value === currentLabel.value)
      : false;
    // check if need to create new label
    if (!exists) {
      const addLabelResRaw = await UserAPI.addLabel(currentLabel);
      console.log("addLabelResRaw:", addLabelResRaw);
      const addLabelRes = await addLabelResRaw.json();
      if (!addLabelRes.valid) {
        console.log(addLabelRes);
        console.log("Failed to add new label:", addLabelRes.msg);
        return;
      }
    } else {
      setCurrentLabel(exists);
    }

    const user = JSON.parse(localStorage.getItem("user"));
    console.log("user from localStorage", user);
    const newPost = {
      title: title,
      date: date,
      content: content,
      author: {
        id: user._id,
        name: user.name,
      },
      label: currentLabel,
      isPrivate: isPrivate,
      location: post ? post.location : location,
    };
    console.log("new post", newPost);
    let resRaw;
    if (post) {
      newPost._id = post._id;
      resRaw = await PostsAPI.updatePost(newPost);
    } else {
      resRaw = await PostsAPI.createPost(newPost);
    }
    console.log("resRaw", resRaw);
    const res = await resRaw.json();
    console.log("res", res);

    if (resRaw.ok) {
      console.log("successfully created post");

      console.log(`label: ${oldLabelVal} vs. ${currentLabel.value}`);
      // if (oldLabelVal !== currentLabel.value) {
      //   await UserAPI.incrementLabel(oldLabelVal, -1);
      //   await UserAPI.incrementLabel(currentLabel.value, 1);
      // } else {
      //   await UserAPI.incrementLabel(currentLabel.value, 1);
      // }

      navigate(0); // refresh current page
    } else {
      console.log("Failed to post", res.msg);
    }
    console.groupEnd();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formTitle">
        <FloatingLabel
          controlId="floatingTextarea"
          label="Title"
          className="mb-3"
        >
          <Form.Control
            as="textarea"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDatetime">
        <Form.Control
          type="datetime-local"
          min="1990-01-01T00:00:00.000Z"
          max="2099-12-31T23:55:55.000Z"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formContent">
        <FloatingLabel
          controlId="floatingTextarea"
          label="Content"
          className="mb-3"
        >
          <Form.Control
            as="textarea"
            placeholder="Write your thoughts here"
            style={{ height: "300px" }}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-3">
        <CreatableSelectLabel
          options={labels}
          setCurrentLabel={setCurrentLabel}
          currentLabel={currentLabel}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPrivateCheckbox">
        <Form.Check
          type="checkbox"
          label="Set as private"
          checked={isPrivate}
          onChange={handleCheckBox}
          // onClick={handleCheckBox}
        />
      </Form.Group>

      <Form.Group>
        <Button className="me-2" variant="primary" type="submit">
          {post ? "Update" : "Create"}
        </Button>
        {post && (
          <Button variant="danger" type="button" onClick={handleDelete}>
            Delete
          </Button>
        )}
      </Form.Group>
    </Form>
  );
};

// <Form.Group className="mb-3">
//   <Form.Select aria-label="Default select example">
//     <option>{currentLabel ? currentLabel : "Set label"}</option>
//     {labels &&
//       labels.map((label, i) => (
//         <option
//           key={i}
//           value={currentLabel}
//           onChange={(e) => {
//             setCurrentLabel(e.target.value);
//           }}
//         >
//           {label.label}
//         </option>
//       ))}
//   </Form.Select>
// </Form.Group>

// <Form.Group className="mb-3" controlId="formTitle">
//   <FloatingLabel
//     controlId="floatingTextarea"
//     label="Custom Label"
//     className="mb-3"
//   >
//     <Form.Control
//       as="textarea"
//       value={currentLabel}
//       onChange={(e) => {
//         setCurrentLabel(e.target.value);
//       }}
//     />
//   </FloatingLabel>
// </Form.Group>

// <Form.Label>Privacy Level</Form.Label>
//         <Form.Select aria-label="Default select">
//           <option>Privacy Level</option>
//           <option value="0">Public</option>
//           <option value="1">Private</option>
//         </Form.Select>

FormEditPost.propTypes = {
  post: PropTypes.object,
  location: PropTypes.object,
  panTo: PropTypes.func,
};

export default FormEditPost;
