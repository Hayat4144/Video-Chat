import RoomModel from "../Model/RoomModel.js";

const Chat = async (req, res) => {
  try {
    const IsChatExist = await RoomModel.find({
      members: { $in: req.user_id },
    }).populate({
      path: "members",
      select: "name",
    });
    if (!IsChatExist) return res.status(400).json({ data: "no data is found" });
    return res.status(200).json({ data: IsChatExist });
  } catch (error) {
    console.log(error);
  }
};

export default Chat;
