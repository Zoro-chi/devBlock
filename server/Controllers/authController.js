const User = require("../Models/User");
const bcrypt = require("bcrypt");

const authController = {
  register: async (req, res) => {
    try {
      // HASH PASSWORD
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt);

      // CREATE NEW USER
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPass,
      });

      // SAVE NEW USER TO DB
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json("user not found")
      }

      const password = await bcrypt.compare(req.body.password, user.password);
      if (!password) {
        return res.status(400).json("wrong password")
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  logout: async (req, res) => {
    req.session.destroy(() => res.clearCookie("connect.sid"));
    res.redirect("/");
  },
};

module.exports = authController;
