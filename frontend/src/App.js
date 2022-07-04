import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { FaStickyNote } from "react-icons/fa";
import "./App.scss";
import NotesComponent from "./Components/Notes/NotesComponent";
import CreateNewNoteSection from "./Components/CreateNewNoteSection/CreateNewNoteSection";

const App = () => {
  //States
  const [notes, setNotes] = useState([]);
  const [createNoteForm, setCreateNoteForm] = useState({
    title: "",
    body: "",
  });

  //UseEffect
  useEffect(() => {
    fetchNotes();
  }, [createNoteForm]);

  const fetchNotes = async () => {
    //Fetch the notes using axios
    const res = await axios.get("http://localhost:3000/notes");

    //Set to state
    setNotes(res.data);
  };

  return (
    <>
      <div className="section-container">
        <div className="section-heading-icon">
          <div className="section-icon">{<FaStickyNote />}</div>
          <h2 className="section-heading">My notes</h2>
        </div>
        {notes.length !== 0 ? (
          notes.map((note) => <NotesComponent key={note._id} note={note} fetchNotes={fetchNotes} />)
        ) : (
          <p>loading your notes</p>
        )}
      </div>

      <CreateNewNoteSection setCreateNoteForm={setCreateNoteForm} createNoteForm={createNoteForm} />
    </>
  );
};

export default App;
