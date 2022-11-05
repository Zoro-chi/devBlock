const router = require("express").Router();
const Message = require("../Models/Message");

// GET MSG
router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
});

// ADD MSG
router.post("/", async (req, res) => {
  const newMsg = new Message(req.body);

  try {
    const saveMsg = await newMsg.save();
    res.status(200).json(saveMsg);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
