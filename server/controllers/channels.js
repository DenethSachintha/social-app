import Channel from "../models/Channel.js";
import User from "../models/User.js";

/* CREATE */
export const createChannel = async (req, res) => {
  try {
    const {
      userId,
      category,
      address,
      website,
      location,
      description,
      picturePath,
      likes,
      reviews
    } = req.body;
    const user = await User.findById(userId);
    const newChannel = new Channel({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      category,
      address,
      website,
      location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: likes || {}, 
      reviews: reviews || [],  
    });
    await newChannel.save();

    const channel = await Channel.find();
    res.status(201).json(channel);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getChannel = async (req, res) => {
  try {
    const { id } = req.params;
    const channel = await Channel.findById(id);
    res.status(200).json(channel);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};



export const getUserChannels = async (req, res) => {
  try {
    const { userId } = req.params;
    const channel = await Channel.find({ userId });
    res.status(200).json(channel);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
