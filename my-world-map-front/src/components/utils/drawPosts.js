import PostsAPI from "../../api/PostsAPI";

async function drawPosts(setPosts, labelSelected, setLoadingPosts) {
  // console.group("drawPosts");

  if (!setLoadingPosts) {
    // console.log("no setLoadingPosts");
  } else {
    setLoadingPosts(true);
    // console.log("setLoadingPosts -> true");
  }

  // console.log(labelSelected);
  const resRaw = await PostsAPI.getPosts(labelSelected);
  // console.log("[Map.js] drawPosts: resRaw", resRaw);

  const res = await resRaw.json();
  // console.log(res);

  // console.log("[Map.js] drawPosts: res.posts", await res.posts);

  setPosts(res.posts);

  if (setLoadingPosts) {
    setLoadingPosts(false);
    // console.log("setLoadingPosts -> false");
  }

  // console.groupEnd();
}

export default drawPosts;
