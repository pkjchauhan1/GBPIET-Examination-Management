import mongoose, { Schema } from "mongoose";

const facultySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  gender: {
    type: String,
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "course",
  },
  contact_number: {
    type: Number,
    required: true,
  },
  avatar: {
    type: String,
  },
  passwordUpdated: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("faculty", facultySchema);
