import mongoose from "mongoose";
const { Schema } = mongoose;

const adminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    username: {
      type: String,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "course",
    },
    avatar: {
      type: String,
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    passwordUpdated: {
      type: Boolean,
      default: false,
    },
  },
  { strict: false }
);

export default mongoose.model("admin", adminSchema);
