import mongoose from "mongoose";
const { Schema } = mongoose;

const subjectSchema = new Schema({
  subject_Name: {
    type: String,
    required: true,
    trim: true,
  },
  subject_Code: {
    type: String,
    required: true,
    index: true,
  },
  course: {
    type: String,
    required: true,
    index: true,
  },
  year: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
    enum: [1, 2],
  },
  credits: {
    type: Number,
    required: true,
    min: 1,
  },
  external_marks: {
    type: Number,
    required: true,
  },
  sessional_marks: {
    type: Number,
    required: true,
  },
  total_marks: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("subject", subjectSchema);
