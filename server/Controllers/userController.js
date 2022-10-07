const User = require("../Models/User");
const bcrypt = require("bcrypt");

const userController = {
  updateUser: async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (error) {
          return res.status(500).json(error);
        }
      }

      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json("Your account has been updated");
      } catch (error) {
        return res.status(500).json(error);
      }
    } else {
      return res.status(400).json("You can only update your account");
    }
  },

  deleteUser: async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Your account has been deleted");
      } catch (error) {
        return res.status(500).json(error);
      }
    } else {
      return res.status(400).json("You can only delete your account");
    }
  },

  getUser: async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
      const user = userId
        ? await User.findById(userId)
        : await User.findOne({ username: username });
      const { password, updatedAt, ...others } = user._doc;
      res.status(200).json(others);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getFriends: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const friends = await Promise.all(
        user.following.map((friendId) => {
          return User.findById(friendId);
        })
      );
      let friendsList = [];
      friends.map((friend) => {
        const { _id, username, profilePicture } = friend;
        friendsList.push({ _id, username, profilePicture });
      });
      res.status(200).json(friendsList);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  followUser: async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const userToFollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (!userToFollow.followers.includes(req.body.userId)) {
          await userToFollow.updateOne({
            $push: { followers: req.body.userId },
          });
          await currentUser.updateOne({
            $push: { following: req.params.id },
          });
          res
            .status(200)
            .json(`Dev ${userToFollow.username} has been followed`);
        } else {
          res
            .status(403)
            .json(`You're already following Dev ${userToFollow.username}`);
        }
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(403).json("You cant follow yourself");
    }
  },

  unFollowUser: async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const userToFollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (userToFollow.followers.includes(req.body.userId)) {
          await userToFollow.updateOne({
            $pull: { followers: req.body.userId },
          });
          await currentUser.updateOne({
            $pull: { following: req.params.id },
          });
          res
            .status(200)
            .json(`Dev ${userToFollow.username} has been un-followed`);
        } else {
          res
            .status(403)
            .json(
              `You're currently not following Dev ${userToFollow.username}`
            );
        }
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(403).json("You cant unfollow yourself");
    }
  },
};

module.exports = userController;
