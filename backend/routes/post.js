const {
  createPosts,
  likeAndUnlikePosts,
  deletePost,
  getPostsOfFollowing,
  updateCaption,
  commentOnPost,
  deleteComments,
} = require("../controllers/post");
const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.route("/post/upload").post(isAuthenticated, createPosts);
router
  .route("/post/:id")
  .get(isAuthenticated, likeAndUnlikePosts)
  .put(isAuthenticated, updateCaption)
  .delete(isAuthenticated, deletePost);

router.route("/posts").get(isAuthenticated, getPostsOfFollowing);

router
  .route("/post/comment/:id")
  .put(isAuthenticated, commentOnPost)
  .delete(isAuthenticated, deleteComments);

module.exports = router;
