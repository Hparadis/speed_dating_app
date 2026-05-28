const express = require("express");

const router = express.Router();

const Conversation = require(
  "../models/Conversation"
);

router.post("/", async (req, res) => {
  try {
    const { participants } = req.body;

    const roomId =
      "room_" + Date.now();

    const conversation =
      await Conversation.create({
        participants,
        roomId,
      });

    res.status(201).json(
      conversation
    );
  } catch (error) {
    res.status(500).json({
      message:
        "Failed to create conversation",
    });
  }
});
router.post("/find-or-create", async (req, res) => {
    try {
      const { userId1, userId2 } = req.body;
  
      let conversation =
        await Conversation.findOne({
          participants: {
            $all: [userId1, userId2],
          },
        });
  
      if (!conversation) {
        conversation =
          await Conversation.create({
            participants: [
              userId1,
              userId2,
            ],
            roomId:
              "room_" + Date.now(),
          });
      }
  
      res.json(conversation);
  
    } catch(error){
  
      res.status(500).json({
        message:
          "Conversation error",
      });
    }
  });

module.exports = router;