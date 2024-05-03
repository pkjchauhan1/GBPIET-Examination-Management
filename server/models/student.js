import mongoose from "mongoose";
const { Schema } = mongoose;

const studentSchema = new Schema({
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
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "course",
  },
  year: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  university_roll_no: {
    type: String,
    required: true,
  },
  university_enrollment_no: {
    type: String,
    required: true,
  },
  college_id: {
    type: String,
    required: true,
  },
  subjects: [
    {
      type: Schema.Types.ObjectId,
      ref: "subject",
    },
  ],
  gender: {
    type: String,
    required: true,
  },
  father_name: {
    type: String,
    required: true,
  },
  contact_number: {
    type: String,
    required: true,
  },
  marks: {
    type: Schema.Types.ObjectId,
    ref: "marks",
  },
  batch: {
    type: String,
    required: true,
  },
  password_updated: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("student", studentSchema);
