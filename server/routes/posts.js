const router = require("express").Router();
const postController = require("../Controllers/postController");
const upload = require("../Middleware/multer");
const { ensureAuth } = require("../Middleware/auth");

// CREATE POST
router.post("/", upload.single("file"), postController.createPost);

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

// GET ALL USER'S POSTS
router.get("/profile/:username", postController.userPosts);

module.exports = router;
