import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
  course: {
    type: String,
    required: true,
  },
});

export default mongoose.model("course", courseSchema);
