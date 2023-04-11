import RoomModel from "../Model/RoomModel.js";
import UserModal from "../Model/UserModel.js";
import MessageModel from "../Model/MessageModel.js";

async function SendMessage(req, res) {
  try {
    let { id, message } = req.body;
    const IsUserExist = await UserModal.findById(id);
    if (!IsUserExist) return res.status(400).json({ error: "User not found" });

    async function Room() {
      const IsRoomExist = await RoomModel.find({
        members: {
          $all: [req.user_id, IsUserExist._id],
        },
      });
      if (IsRoomExist.length < 1) {
        const new_room = new RoomModel({
          name: `${IsUserExist.email} and ${req.email}`,
          type: "direct",
          members: [req.user_id, IsUserExist._id],
        });

        // saved room
        const Saved_room = await new_room.save();
        return [Saved_room];
      }
      return IsRoomExist;
    }

    const RoomData = await Room();
    // create message model
    const New_Message = await MessageModel({
      payload: {
        type: "text",
        content: message,
      },
      sender: req.user_id,
      reciever: IsUserExist._id,
      room: RoomData[0]._id,
    });

    const SaveNewMessage = await New_Message.save();
    const UpdateRoom = await RoomModel.findByIdAndUpdate(RoomData[0]._id, {
      $push: { message: SaveNewMessage._id },
      new: true,
    });
    if (SaveNewMessage && UpdateRoom)
      return res.status(200).json({ data: SaveNewMessage });
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error: error.message });
  }
}

export default SendMessage;
