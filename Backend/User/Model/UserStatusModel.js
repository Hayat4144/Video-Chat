import mongoose from "mongoose";

const userStatusSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  status: {
    type: String,
    enum: ["online", "offline", "away", "busy"],
    default: "offline",
    required: true,
  },
  lastActive: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const UserStatusModel = new mongoose.Model("UserStatus", userStatusSchema);

export default UserStatusModel;
