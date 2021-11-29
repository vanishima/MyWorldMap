import PostsAPI from "../../api/PostsAPI";

async function drawPosts(
  setPosts,
  labelSelected = null,
  isLoading = null,
  setLoading = null
) {
  if (isLoading !== null) {
    setLoading(true);
  }

  console.group("drawPosts");
  console.log(labelSelected);
  const resRaw = await PostsAPI.getPosts(labelSelected);
  // console.log("[Map.js] drawPosts: resRaw", resRaw);

  const res = await resRaw.json();
  console.log(res);

  // console.log("[Map.js] drawPosts: res.posts", await res.posts);
  console.groupEnd();
  setPosts(res.posts);

  if (isLoading !== null) {
    setLoading(false);
  }
}

export default drawPosts;
