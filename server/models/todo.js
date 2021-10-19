const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    todo: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Todo", TodoSchema);
