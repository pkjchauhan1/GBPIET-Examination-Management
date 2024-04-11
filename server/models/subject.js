import mongoose from "mongoose";
const { Schema } = mongoose;

const subjectSchema = new Schema({
  subject_name: {
    type: String,
    required: true,
  },
  subject_code: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  credits: {
    type: String,
    required: true,
  },
  external_marks: {
    type: String,
    required: true,
  },
  sessional_marks: {
    type: String,
    required: true,
  },
  total_marks: {
    type: String,
    required: true,
  },
});

export default mongoose.model("subject", subjectSchema);
