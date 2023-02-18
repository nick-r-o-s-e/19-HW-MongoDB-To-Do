const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    content: {
      required: true,
      type: String,
    },
    complited: {
      required: true,
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
