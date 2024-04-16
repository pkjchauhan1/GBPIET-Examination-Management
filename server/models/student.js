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
    require: true,
  },
  college_id: {
    type: String,
    require: true,
  },
  subjects: [
    {
      type: Schema.Types.ObjectId,
      ref: "subject",
    },
  ],
  gender: {
    type: String,
  },
  father_name: {
    type: String,
  },
  contact_number: {
    type: String,
  },
  marks: {
    type: Schema.Types.ObjectId,
    ref: "marks",
  },
  batch: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  password_updated: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("student", studentSchema);
