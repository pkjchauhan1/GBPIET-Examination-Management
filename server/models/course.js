import mongoose, { Schema } from "mongoose";

const courseSchema = mongoose.Schema({
  course: {
    type: String,
    required: true,
  },
  faculty_id: {
    type: Schema.Types.ObjectId,
    ref: "faculty",
  },
});

export default mongoose.model("course", courseSchema);
