const router = require("express").Router();
const userController = require("../Controllers/userController");
const { ensureAuth } = require("../Middleware/auth");

// UPDATE USER
router.put("/:id", userController.updateUser);

// DELETE USER
router.delete("/:id", userController.deleteUser);

// GET USER
router.get("/", userController.getUser);

// FOLLOW USER
router.put("/:id/follow", userController.followUser);

// UNFOLLOW USER
router.put("/:id/unfollow", userController.unFollowUser);

module.exports = router;
