import mongoose from "mongoose";

const CallSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  caller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  callee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  type: {
    type: String,
    enum: ["audio", "video"],
    required: true,
  },
  startedAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  endedAt: {
    type: Date,
  },
});

const CallModel = new mongoose.Model("Call", CallSchema);

export default CallModel;
