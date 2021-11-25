import { useState } from "react";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import PropTypes from "prop-types";

// API
import PostsAPI from "../api/PostsAPI";

const FormEditPost = ({ location, post, panTo, labels }) => {
  const [title, setTitle] = useState(post ? post.title : "");
  const [date, setDate] = useState(
    post
      ? new Date(post.date).toISOString().slice(0, -3)
      : new Date().toISOString().slice(0, -3)
  );
  const [content, setContent] = useState(post ? post.content : "");
  // const isPrivateRef = useRef(null);
  const [isPrivate, setIsPrivate] = useState(
    post && post.isPrivate ? true : false
  );
  const [label, setLabel] = useState(post && post.label ? post.label : "memo");

  const handleCheckBox = () => {
    console.log("isPrivate changed", isPrivate);
    setIsPrivate(!isPrivate);
  };

  const handleDelete = async (evt) => {
    evt.preventDefault();
    console.log("trying to delete", post);
    const resRaw = await PostsAPI.deletePost(post);
    const res = await resRaw.json();

    if (resRaw.ok) {
      console.log("successfully deleted post");
      document.location.href = "/map";
    } else {
      console.log("Failed to post", res.msg);
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
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
      label: label,
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
      document.location.href = "/map";
      panTo(location ? location : post.location);
    } else {
      console.log("Failed to post", res.msg);
    }
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
            style={{ height: "200px" }}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </FloatingLabel>
      </Form.Group>

      <Form.Select aria-label="Default select example">
        <option>{label ? label : "Set label"}</option>
        {labels &&
          labels.map((label, i) => (
            <option
              key={i}
              value={label}
              onChange={(e) => {
                setLabel(e.target.value);
              }}
            >
              {label}
            </option>
          ))}
      </Form.Select>

      <Form.Group className="mb-3" controlId="formPrivateCheckbox">
        <Form.Check
          type="checkbox"
          label="Set as private"
          value={isPrivate}
          onClick={handleCheckBox}
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
