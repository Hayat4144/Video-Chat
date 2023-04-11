import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: [true, "email is required."],
  },
  password: {
    type: String,
    require: [true, "password is required"],
  },
});

const UserModal = new mongoose.model("User", UserSchema);

export default UserModal;
