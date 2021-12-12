const FRONTEND =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_FRONTEND_PREFIX
    : ".";

function PostsAPI() {
  const Posts = {};

  Posts.getPosts = async (label = null) => {
    console.group("PostsAPI Posts.getPosts");
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log("[Map.js] getPosts with user", user);
    const suffix = label ? "/label/" + label.value : "";
    console.log("suffix:", suffix);
    console.groupEnd();
    if (user == null) {
      return fetch(FRONTEND + "/posts/public" + suffix);
    } else {
      // console.log("user_id before fetch", user._id);
      // console.log("token before fetch", localStorage.getItem("token"));
      return fetch(FRONTEND + "/posts" + suffix, {
        method: "GET",
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
        mode: "cors",
      });
    }
  };

  Posts.getPublicLabelCounts = async () => {
    console.group("PostsAPI Posts.getPublicLabelCounts");
    return fetch(FRONTEND + "/posts/public/labels");
  };

  Posts.getPostByID = async (postID) => {
    return fetch(FRONTEND + "/posts/" + postID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
  };

  Posts.createPost = async (post) => {
    return fetch(FRONTEND + "/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      mode: "cors",
      body: JSON.stringify(post),
    });
  };

  Posts.updatePost = async (post) => {
    return fetch(FRONTEND + "/posts/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      mode: "cors",
      body: JSON.stringify(post),
    });
  };

  Posts.deletePost = async (post) => {
    return fetch(FRONTEND + "/posts/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      mode: "cors",
      body: JSON.stringify(post),
    });
  };

  return Posts;
}

export default PostsAPI();
