import mongoose from "mongoose";

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
    type: Boolean, // True -> Male, False -> Female
    required: true,
  },
  course: {
    type: String,
    required: true,
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
