import PostsAPI from "../../api/PostsAPI";

async function drawPosts(setPosts, labelSelected = null) {
  console.group("drawPosts");
  console.log(labelSelected);
  const resRaw = await PostsAPI.getPosts(labelSelected);
  // console.log("[Map.js] drawPosts: resRaw", resRaw);

  const res = await resRaw.json();
  console.log(res);

  // console.log("[Map.js] drawPosts: res.posts", await res.posts);
  console.groupEnd();
  await setPosts(res.posts);
}

export default drawPosts;
