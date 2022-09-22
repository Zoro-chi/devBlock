const router = require("express").Router();
const authController = require("../Controllers/authController");
const passport = require("passport");
require("dotenv").config();

// REGISTER
router.post("/register", authController.register);

// LOGIN
router.post("/login", authController.login);

// GITHUB AUTH
router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect(process.env.CLIENT_URL);
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    sucess: false,
    message: "failure",
  });
});

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(401).json({
      sucess: true,
      message: "successfull",
      user: req.user,
    });
  }
});

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "login/failed",
  })
);

module.exports = router;
