//Import Dependancies
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

const Note = mongoose.model("Notes", noteSchema);

module.exports = Note;
