import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";

const getUsersForSideBar = async (req, res) => {
  try {
    const myId = req.user._id;
    const filteredUsers = await User.find({
      _id: {
        $ne: myId,
      },
    }).select("-password");

    res
      .status(200)
      .json({ message: "Users got successfully! -", data: filteredUsers });
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

const getChatMessages = async (req, res) => {
  try {
    const idToChatId = req.params.id;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: idToChatId },
        { senderId: idToChatId, receiverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getChatMessages:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const sendMessage = async (req, res) => {
  try {
    const myId = req.user._id;
    const receiverId = req.params.id;
    const { text, image } = req.body;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({
      receiverId,
      senderId: myId,
      text,
      image: imageUrl,
    });
    await newMessage.save();
    res.status(200).json({ message: newMessage });
  } catch (e) {
    res.status(500).json({ message: e });
  }
};
export { getUsersForSideBar, getChatMessages, sendMessage };
