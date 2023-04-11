import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  payload: {
    type: {
      type: String,
      enum: ["text", "image", "gif", "video"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  reciever: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
});

const MessageModel = new mongoose.model("message", MessageSchema);

export default MessageModel;
