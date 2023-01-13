let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let bookSchema = new Schema({
  name: { type: String, required: true },
  summary: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  category: { type: String, required: true },
  author: { type: String },
  tags: [{ type: String }],
});

module.exports = mongoose.model("Book", bookSchema);
