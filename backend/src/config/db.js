import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/social_media`);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Failed to connect", error);
  }
};

export default connectDB;
