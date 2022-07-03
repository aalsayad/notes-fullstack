//Load env variable
require("dotenv").config();

//Import Dependencies
const express = require("express");
const connectToDb = require("./config/connectToDB");
const cors = require("cors");

const {
  fetchNotes,
  fetchNote,
  addNote,
  updateNote,
  deleteNote,
} = require("./controllers/notesController");

//Create an Express App
const app = express();

//Configure Express App
app.use(express.json()); //?This is how our express app will read and respond with JSON
app.use(cors()); //?This is how to make the server accept requests from all domains

//Connect to Database
connectToDb();

//Routing
//!Get ALl Notes
app.get("/notes", fetchNotes);

//!Find Note By Id
app.get("/notes/:id", fetchNote);

//!Add a new Note
app.post("/notes", addNote);

//!Update a note
app.put("/notes/:id", updateNote);

//!Delete a note
app.delete("/notes/:id", deleteNote);

//Start our server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}!`);
});
