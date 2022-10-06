const Post = require("../Models/Post");
const User = require("../Models/User");
const cloudinary = require("../Middleware/cloudinary");

const postController = {
  createPost: async (req, res) => {
    try {
      const fileString = req.body.image;
      const result = await cloudinary.uploader.upload(fileString, {
        folder: "devBlock",
      });
      await Post.create({
        img: result.secure_url,
        cloudinaryId: result.public_id,
        desc: req.body.desc,
        userId: req.body.userId,
      });
      res.status(200).json("Post saved");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updatePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.userId === req.body.userId) {
        await post.updateOne({ $set: req.body });
        res.status(200).json("Your post has been updated");
      } else {
        res.status(403).json("You can only update your posts");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deletePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.userId === req.body.userId) {
        await cloudinary.uploader.destroy(post.cloudinaryId);
        await post.deleteOne();
        res.status(200).json("Your post has been deleted");
      } else {
        res.status(403).json("You can only delete your posts");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  likePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json("Post has been liked");
      } else {
        await post.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).json("Post has been un-liked");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  timelinePosts: async (req, res) => {
    try {
      const currentUser = await User.findById(req.params.userId);
      const userPosts = await Post.find({ userId: currentUser.id });
      const friendsPosts = await Promise.all(
        currentUser.following.map((friendId) => {
          return Post.find({ userId: friendId });
        })
      );
      let timeline = userPosts.concat(...friendsPosts);
      timeline.sort((a, b) => b.createdAt - a.createdAt);
      res.status(200).json(timeline);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  userPosts: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.username });
      const posts = await Post.find({ userId: user._id });
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = postController;
