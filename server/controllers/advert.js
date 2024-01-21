import Advert from "../models/Advert.js";
import User from "../models/User.js";

/* CREATE */
export const createAdvert = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newAdvert = new Advert({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
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

/* UPDATE */
// export const likePost = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { userId } = req.body;
//     const post = await Post.findById(id);
//     const isLiked = post.likes.get(userId);

//     if (isLiked) {
//       post.likes.delete(userId);
//     } else {
//       post.likes.set(userId, true);
//     }

//     const updatedPost = await Post.findByIdAndUpdate(
//       id,
//       { likes: post.likes },
//       { new: true }
//     );

//     res.status(200).json(updatedPost);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };