import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { FaStickyNote } from "react-icons/fa";
import "./App.scss";

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
      }, 1000);
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
        <h2 className="section-heading">My Notes</h2>
        {notes.length !== 0 ? (
          notes.map((note) => (
            <div className="note-box" key={note._id}>
              <h3>{note.title}</h3>
              <p>{note.body}</p>
            </div>
          ))
        ) : (
          <p>loading your notes</p>
        )}
      </div>

      <div className="section-container">
        <h2 className="section-heading">Create a New Note</h2>
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
