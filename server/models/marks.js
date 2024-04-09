import mongoose from "mongoose";
const { Schema } = mongoose;

const marksSchema = new Schema({
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
  subject_grade: {
    type: String,
    required: true,
  },
  grade_point: {
    type: Number,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
  remark: {
    type: String,
    required: true,
  },
  SGPA: {
    type: Number,
    required: true,
  },
  CGPA: {
    type: Number,
    required: true,
  },
  earned_credits: {
    type: Number,
    required: true,
  },
  cuml_earned_credits: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("marks", marksSchema);
