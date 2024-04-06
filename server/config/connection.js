import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const connectDB = async (CONNECTION_URL) => {
  mongoose
    .connect(CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("-> Database Connected <-"))
    .catch((error) => console.log("Mongo Error", error.message));
};

export default connectDB;
