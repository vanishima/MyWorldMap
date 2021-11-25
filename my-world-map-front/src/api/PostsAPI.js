const FRONTEND =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_FRONTEND_PREFIX
    : "";

function PostsAPI() {
  const Posts = {};

  Posts.getPosts = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("[Map.js] getPosts with user", user);
    if (user == null) {
      return fetch(FRONTEND + "/posts/public");
    } else {
      const authorId = user.id;
      console.log("authorId before fetch", authorId);
      console.log("token before fetch", localStorage.getItem("token"));
      return fetch("./posts", {
        method: "GET",
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
        mode: "cors",
      });
    }
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
