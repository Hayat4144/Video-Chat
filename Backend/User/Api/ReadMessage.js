import MessageModel from "../Model/MessageModel.js";
import RoomModel from "../Model/RoomModel.js";

async function ReadMessage(req, res) {
  try {
    const { reciever_id } = req.query;
    // const FindMessage = await MessageModel.find({
    //   sender: req.user_id,
    //   reciever: reciever_id,
    // });

    const FindMessage = await RoomModel.find({
      members: {
        $all: [req.user_id, reciever_id],
      },
    }).populate("message");
    if (FindMessage.length < 1)
      return res.status(404).json({ no_result: "No message has been found." });
    return res.status(200).json({ data: FindMessage });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export default ReadMessage;
