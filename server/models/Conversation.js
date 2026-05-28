const mongoose = require("mongoose");

const conversationSchema =
  new mongoose.Schema(
    {
      participants: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],

      roomId: {
        type: String,
        required: true,
      },
      startedAt:{
        type:Date
    },
    
    duration:{
        type:Number
    }
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "Conversation",
  conversationSchema
);