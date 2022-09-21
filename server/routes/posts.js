const router = require("express").Router();
const postController = require("../Controllers/postController");

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
router.get("/timeline/all", postController.timelinePosts);

module.exports = router;
