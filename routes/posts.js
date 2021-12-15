const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");

const auth = require("../middleware/auth");
const Post = require("../db/postDB.js");

// POST Create new post
router.post("/create", auth, async (req, res) => {
  console.log(">>>>> POST /posts/create");
  const newPost = req.body;
  newPost.author.id = ObjectId(newPost.author.id);
  try {
    console.log("ready to create new post", newPost);
    const response = await Post.createOne(newPost);
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/* GET public posts*/
router.get("/public", async (req, res) => {
  try {
    const posts = await Post.getPosts({
      $and: [{ $or: [{ isPublic: true }, { isPrivate: false }] }, {}],
    });
    // console.log("GET posts/public:", posts);
    res.status(200).json({ posts: posts });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/* GET public label counts */
router.get("/public/labels", async (req, res) => {
  try {
    const labels = await Post.getPublicLabelCounts();
    console.log("GET posts/getPublicLabelCounts:", labels);
    res.status(200).json({ labels: labels });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/* GET posts by one user*/
router.get("/", auth, async (req, res) => {
  console.log(">>>>> GET /posts");
  const authorId = req.user.id;
  console.log("authorId:", authorId);
  try {
    const posts = await Post.getPosts({
      $or: [
        { authorId: ObjectId(authorId) },
        { "author.id": ObjectId(authorId) },
      ],
    });
    // console.log("Got posts", posts);
    res.status(200).json({ posts: posts });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});
// 61aa8fabe7c114442dddd2e1

/* GET posts with label */
router.get("/label/:label", auth, async (req, res) => {
  const label = req.params.label;
  const authorId = req.user.id;
  console.log("GET /label", label);
  console.log(label);
  try {
    // const posts = await Post.getPosts({
    //   $and: [
    //     { $or: [{ label: label }, { "label.value": label }] },
    //     {
    //       $or: [
    //         {
    //           $or: [
    //             { authorId: ObjectId(authorId) },
    //             { "author.id": ObjectId(authorId) },
    //           ],
    //         },
    //         { isPrivate: false },
    //       ],
    //     },
    //   ],
    // });

    const posts = await Post.getPosts({
      $and: [
        { $or: [{ label: label }, { "label.value": label }] },
        {
          $or: [
            { authorId: ObjectId(authorId) },
            { "author.id": ObjectId(authorId) },
          ],
        },
      ],
    });
    console.log("GET posts/label:", posts);
    res.status(200).json({ posts: posts });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/* GET public posts with label */
router.get("/public/label/:label", async (req, res) => {
  const label = req.params.label;
  console.log("GET /public/label", label);
  console.log(label);
  try {
    const posts = await Post.getPosts({
      $and: [
        { $or: [{ isPublic: true }, { isPrivate: false }] },
        { $or: [{ label: label }, { "label.label": label }] },
      ],
    });
    console.log("GET posts/public:", posts);
    res.status(200).json({ posts: posts });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/* GET posts by one user*/
// router.get("/:authorId", auth, async (req, res) => {
//   console.log(">>>>> GET /posts");
//   const authorId = req.params.authorId.trim();
//   console.log("authorId:", authorId);
//   try {
//     const posts = await Post.getPosts({ authorId: ObjectId(authorId) });
//     res.status(200).json({ posts: posts });
//   } catch (e) {
//     res.status(400).send({ msg: e.message });
//   }
// });
// router.get("/:authorId", async (req, res) => {
//   console.log(">>>>> GET /posts");
//   const authorId = req.user.id;
//   console.log("authorId:", authorId);
//   try {
//     const posts = await Post.getPosts({
//       $or: [
//         { authorId: ObjectId(authorId) },
//         { "author.id": ObjectId(authorId) },
//       ],
//     });
//     res.status(200).json({ posts: posts });
//   } catch (e) {
//     res.status(400).json({ msg: e.message });
//   }
// });

/* GET post by ID */
router.get("/:postID", async (req, res) => {
  console.log(">>>>> GET /posts");
  const postID = req.params.postID;
  console.log("postID:", postID);
  try {
    const posts = await Post.getPosts({
      _id: ObjectId(postID),
    });
    console.log("GET /posts/postID", posts);
    res.status(200).json({ posts: posts });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/* POST UPDATE current post */
router.post("/update", auth, async (req, res) => {
  const post = req.body;
  console.log("enter /posts/update post", post);

  // update post
  try {
    console.log("trying to update post");
    const dbRes = await Post.updatePostByID(post);
    console.log("dbRes: ", dbRes);
    res.status(200).json({ status: "OK" });
  } catch (e) {
    // console.log("Error", e);
    res.status(400).send({ msg: e });
  }
});

/* POST DELETE current post */
router.post("/delete", auth, async (req, res) => {
  const post = req.body;

  console.log("enter /posts/delete", post);

  // update post
  try {
    const dbRes = await Post.deletePostByID(ObjectId(post._id));
    console.log("dbRes: ", dbRes);
    res.status(200).json({ msg: "OK" });
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({ msg: e });
  }
});

module.exports = router;
