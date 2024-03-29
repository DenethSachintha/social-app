import mongoose from "mongoose";
 
const advertSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    channelId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    availability: {
     type: Boolean,
     required: true,
    },
    price: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    
  },
  { timestamps: true }
);

const Advert = mongoose.model("Advert", advertSchema);

export default Advert;
