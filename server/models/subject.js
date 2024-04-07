import mongoose from "mongoose";
const { Schema } = mongoose;

const subjectSchema = new Schema({
  subjectName: {
    type: String,
    required: true,
    trim: true,
  },
  subjectCode: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  totalLectures: {
    type: Number,
    default: 15,
  },
  credits: {
    type: Number,
    //sandy,
    required: true,
  },
  externalMarks: {
    //sandy
    type: Number,
    required: true,
  },
  sessionalMarks: {
    //sandy
    type: Number,
    required: true,
  },
  totalMarks: {
    //sandy
    type: Number,
    required: true,
  },
  grade: {
    //sandy
    type: String,
    required: true,
  },
  gradePoint: {
    //sandy
    type: Number,
    required: true,
  },
});

export default mongoose.model("subject", subjectSchema);
