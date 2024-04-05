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
    type: String,
    requireL: true,
  },
  year: {
    type: Number,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  university_roll_no: {
    type: Number,
    required: true,
  },
  university_enrollment_no: {
    type: String,
    require: true,
  },
  college_id: {
    type: Number,
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
    type: Number,
  },
  father_contact_number: {
    type: Number,
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
