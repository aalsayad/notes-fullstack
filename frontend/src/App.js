import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { FaStickyNote, FaPlus } from "react-icons/fa";
import "./App.scss";
import NotesComponent from "./Notes/NotesComponent";

const App = () => {
  //States
  const [notes, setNotes] = useState([]);
  const [createNoteForm, setCreateNoteForm] = useState({
    title: "",
    body: "",
  });
  const [createNoteFormMessage, setCreateNoteFormMessage] = useState();

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

  const handleCreateNoteForm = (e) => {
    const { name, value } = e.target;
    setCreateNoteForm({
      ...createNoteForm,
      [name]: value,
    });
    console.log(createNoteForm);
  };

  const submitCreateNoteForm = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/notes", createNoteForm);
      setCreateNoteForm({
        title: "",
        body: "",
      });
      setCreateNoteFormMessage("Note succesfully added!");
      setTimeout(() => {
        setCreateNoteFormMessage(null);
      }, 3000);
    } catch (err) {
      switch (err.response.data.error.code) {
        case 11000:
          setCreateNoteFormMessage("Note title is already in use!");
          break;
        default:
          setCreateNoteFormMessage(err.response.data.error.message);
      }
    }
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

      <div className="section-container">
        <div className="section-heading-icon">
          <div className="section-icon">{<FaPlus />}</div>
          <h2 className="section-heading">Create a new note</h2>
        </div>
        <form className="note-box new-note" onSubmit={submitCreateNoteForm}>
          {createNoteFormMessage && (
            <p
              className={
                createNoteFormMessage.includes("succesfully") ? "successMessage" : "errorMessage"
              }
            >
              {createNoteFormMessage}
            </p>
          )}
          <label>
            Note Title <span className="star-required">*</span>
          </label>
          <input
            name="title"
            value={createNoteForm.title}
            type="text"
            onChange={handleCreateNoteForm}
          />
          <label>
            Note Description <span className="star-required">*</span>
          </label>
          <textarea
            name="body"
            value={createNoteForm.body}
            type="text"
            onChange={handleCreateNoteForm}
          />
          <button type="submit">Create Note</button>
        </form>
      </div>
    </>
  );
};

export default App;
