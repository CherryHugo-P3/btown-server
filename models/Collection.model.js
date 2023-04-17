const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const collectionSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    userId: {
      type: { type: Schema.Types.ObjectId, ref: "User" },
    },
    spots: [{ type: Schema.Types.ObjectId, ref: "Spot" }],
  },
  {
    timestamps: true,
  }
);

const Collection = model("collection", collectionSchema);

module.exports = Collection;
