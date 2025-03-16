const mongoose = require("mongoose");

const InterviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    technology: {
      type: String,
      required: true,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    totalQuestion: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
); 

module.exports = mongoose.model("Interview", InterviewSchema);
