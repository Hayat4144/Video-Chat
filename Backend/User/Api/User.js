import UserModal from "../Model/UserModel.js";

async function findUser(req, res) {
  const { user_id } = req.query;
  try {
    const IsUserExist = await UserModal.findById(user_id).select("-password");
    if (!IsUserExist)
      return res.status(404).json({ error: "No user is found." });
    return res.status(200).json({ data: IsUserExist });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

export default findUser;
