const router = require("express").Router();
const userController = require("../Controllers/userController");
const { ensureAuth } = require("../Middleware/auth");

router.get("/", (req, res) => {
  res.send("User route");
});

// UPDATE USER
router.put("/:id", userController.updateUser);

// DELETE USER
router.delete("/:id", userController.deleteUser);

// GET USER
router.get("/:id", userController.getUser);

// FOLLOW USER
router.put("/:id/follow", userController.followUser);

// UNFOLLOW USER
router.put("/:id/unfollow", userController.unFollowUser);

module.exports = router;
