import Advert from "../models/Advert.js";
import User from "../models/User.js";
/* CREATE */
export const createAdvert = async (req, res) => {
  try {
    const { userId, channelId, description, picturePath ,availability,price} = req.body;
    const user = await User.findById(userId);
    const newAdvert = new Advert({
      userId,    
      channelId,
      firstName: user.firstName,
      lastName: user.lastName,
      availability,
      price,
      description,
      userPicturePath: user.picturePath,
      picturePath,
    });
    await newAdvert.save();

    const advert = await Advert.find();
    res.status(201).json(advert);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedAdverts = async (req, res) => {
  try {
    const advert = await Advert.find();
    res.status(200).json(advert);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserAdverts = async (req, res) => {
  try {
    const { userId } = req.params;
    const advert = await Advert.find({ userId });
    res.status(200).json(advert);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getChannelAdverts = async (req, res) => {
  try {
    const { channelId } = req.params;
    const advert = await Advert.find({ channelId });
    res.status(200).json(advert);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
