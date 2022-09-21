const router = require("express").Router();
const postController = require("../Controllers/postController");
const { ensureAuth } = require("../Middleware/auth");

// CREATE POST
router.post("/", ensureAuth, postController.createPost);

// UPDATE POST
router.put("/:id", ensureAuth, postController.updatePost);

// DELETE POST
router.delete("/:id", ensureAuth, postController.deletePost);

// LIKE POST
router.put("/:id/like", ensureAuth, postController.likePost);

// GET POST
router.get("/:id", ensureAuth, postController.getPost);

// GET TIMELINE POSTS
router.get("/timeline/all", ensureAuth, postController.timelinePosts);

module.exports = router;
