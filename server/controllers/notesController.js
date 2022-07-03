const Note = require("../models/notes");

//!Get All Notes
const fetchNotes = async (req, res) => {
  try {
    //Find Notes
    const notes = await Note.find();
    //Respond with Notes
    res.status(200).send(notes);
  } catch (err) {
    console.log(err);
  }
};

//!Find Note By Id
const fetchNote = async (req, res) => {
  //Find the not using the ID in the URL
  const note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).send({ error: "No note corresponds to entered ID" });
  }
  //Respond with Note that corresponds to that ID
  res.status(200).send(note);
};

//!Add a new Note
const addNote = async (req, res) => {
  try {
    //Get the sent in data off request body
    const title = req.body.title;
    const body = req.body.body;
    //Create Note with it
    const newNote = await Note.create({
      title: title,
      body: body,
    });
    //Respond with the new note that has been just added
    res.status(201).send(newNote);
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

//!Update a note by Id
const updateNote = async (req, res) => {
  try {
    //Get the req info off of the req body
    const title = req.body.title;
    const body = req.body.body;

    //Find by ID and Update
    await Note.findByIdAndUpdate(req.params.id, {
      title: title,
      body: body,
    });

    //Get the updated Note
    const updatedNote = await Note.findById(req.params.id);

    //Error Check
    if (!updatedNote) {
      return res.status(404).send({ error: "No note corresponds to entered ID" });
    }
    //Respond with the updated note
    res.status(200).send(updatedNote);
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

//!delete a note
const deleteNote = async (req, res) => {
  try {
    //Find By Id and delete the note
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).send({ error: "No note corresponds to entered ID" });
    }
    //Respond with that deleted note
    res.status(200).send(deletedNote);
  } catch (err) {
    console.log(`error while deleting note:`, err);
  }
};

module.exports = {
  fetchNotes: fetchNotes,
  fetchNote: fetchNote,
  addNote: addNote,
  updateNote: updateNote,
  deleteNote: deleteNote,
};
