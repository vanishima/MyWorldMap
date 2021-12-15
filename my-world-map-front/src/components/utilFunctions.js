import PostsAPI from "../api/PostsAPI";

export function checkAuthorship(post, setBelongsToUser) {
  console.group("checkAuthorship");
  if (!localStorage.getItem("user")) {
    setBelongsToUser(false);
    return;
  }
  const author_id = post.author ? post.author.id : post.authorId;
  const user_id = JSON.parse(localStorage.getItem("user"))._id;
  console.log("author_id", author_id);
  console.groupEnd("user_id", user_id);
  setBelongsToUser(author_id === user_id);
}

export async function fetchPost(setPost, setBelongsToUser) {
  const url = new URL(window.location);
  const postID = url.searchParams.get("postID");
  console.log("PostDetails:", postID);
  const resRaw = await PostsAPI.getPostByID(postID);
  const res = await resRaw.json();
  const post = res.posts[0];
  post.contentStr = post.content.replace(/\n/g, "<br>");
  checkAuthorship(post, setBelongsToUser);
  await setPost(post);
}
