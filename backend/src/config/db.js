import mongoose from "mongoose";

const connectDB = async () => {
  // try {
  //   mongoose.connection.on("connected", () => console.log("DB connected"));
  //   await mongoose.connect(`${process.env.MONGO_URI}/social_media`);
  // } catch (error) {
  //   console.log(error.message);
  // }
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("DB connected");
    })
    .catch((err) => {
      console.log(err);

      console.log("Faild to connect");
    });
};

export default connectDB;
