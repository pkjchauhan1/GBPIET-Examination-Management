import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
  course: {
    type: String,
    required: true,
  },
  courseCode: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model("course", courseSchema);
