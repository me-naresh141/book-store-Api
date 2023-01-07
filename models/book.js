let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let bookSchema = new Schema({
  name: { type: String, required: true },
  summary: { type: String, required: true },
});

module.exports = mongoose.model("Book", bookSchema);
