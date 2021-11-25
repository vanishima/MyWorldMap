import PostsAPI from "../../api/PostsAPI";

async function drawPosts(setPosts, labelsSelected=null) {
  // console.log("[Map.js] drawPosts: starting");

  const resRaw = await PostsAPI.getPosts(labelsSelected);
  // console.log("[Map.js] drawPosts: resRaw", resRaw);

  const res = await resRaw.json();

  // console.log("[Map.js] drawPosts: res.posts", await res.posts);

  await setPosts(res.posts);
}

export default drawPosts;
