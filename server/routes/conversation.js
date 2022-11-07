const router = require("express").Router();
const Conversation = require("../Models/Conversation");

// GET CONVERSATION OF USER
router.get("/:userId", async (req, res) => {
  try {
    const convo = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(convo);
  } catch (error) {
    res.status(500).json(error);
  }
});

// NEW CONVERSATION
router.post("/", async (req, res) => {
  const newConvo = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConvo = await newConvo.save();
    res.status(200).json(savedConvo);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET CONVO OF TWO USERS-ID
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const convo = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(convo);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
