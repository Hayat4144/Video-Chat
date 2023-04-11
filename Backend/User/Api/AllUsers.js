import UserModel from "../Model/UserModel.js";

async function AllUsers(req, res) {
  try {
    const Users = await UserModel.find({ _id: { $ne: req.user_id } }).select(
      "-password"
    );
    if (Users.length < 1)
      return res.status(400).json({ error: "No user has been found." });
    return res.status(200).json({ data: Users });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
}

export default AllUsers;
