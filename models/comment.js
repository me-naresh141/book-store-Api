let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Book = require("../models/book");

let commentSchema = new Schema({
  bookId: { type: Schema.Types.ObjectId, ref: "Book" },
  comment: { type: String },
});

module.exports = mongoose.model("Comment", commentSchema);
