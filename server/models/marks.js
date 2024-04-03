import mongoose from "mongoose";
const { Schema } = mongoose;

const marksSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "student",
  },
  marks: {
    type: Number,
    default: -1,
  },
});

export default mongoose.model("marks", marksSchema);
