import UserModal from "../Model/UserModel.js";

async function SearchUser(req, res) {
  try {
    const { search_user } = req.query;
    if (!search_user)
      return res.status(400).json({ error: "username can not be empty." });

    const isUserExist = await UserModal.find({
      email: { $regex: search_user, $options: "si" },
      _id: { $ne: req.user_id },
    }).select("-password");

    if (!isUserExist) return res.status(404).json({ error: "No user found" });

    console.table(isUserExist);
    return res.status(200).json({ data: isUserExist });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
}

export default SearchUser;
