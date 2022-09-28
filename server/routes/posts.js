const router = require("express").Router();
const postController = require("../Controllers/postController");
const { ensureAuth } = require("../Middleware/auth");

// CREATE POST
router.post("/", postController.createPost);

// UPDATE POST
router.put("/:id", postController.updatePost);

// DELETE POST
router.delete("/:id", postController.deletePost);

// LIKE POST
router.put("/:id/like", postController.likePost);

// GET POST
router.get("/:id", postController.getPost);

// GET TIMELINE POSTS
router.get("/timeline/:userId", postController.timelinePosts);

module.exports = router;
