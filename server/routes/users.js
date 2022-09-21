const router = require("express").Router();
const userController = require("../Controllers/userController");
const { ensureAuth } = require("../Middleware/auth");

router.get("/", (req, res) => {
  res.send("User route");
});

// UPDATE USER
router.put("/:id", ensureAuth, userController.updateUser);

// DELETE USER
router.delete("/:id", ensureAuth, userController.deleteUser);

// GET USER
router.get("/:id", ensureAuth, userController.getUser);

// FOLLOW USER
router.put("/:id/follow", ensureAuth, userController.followUser);

// UNFOLLOW USER
router.put("/:id/unfollow", ensureAuth, userController.unFollowUser);

module.exports = router;
