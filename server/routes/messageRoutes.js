const express = require("express");

const router = express.Router();

const Message = require(
  "../models/Message"
);

router.get(
  "/:conversationId",
  async (req, res) => {
    try {
      const messages =
        await Message.find({
          conversationId:
          req.params.conversationId
        })
        .populate(
          "sender",
          "username"
        )
        .sort({
          createdAt:1
        });

      res.json(messages);
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to fetch messages",
      });
    }
  }
);

module.exports = router;