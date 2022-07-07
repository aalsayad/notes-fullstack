//!Imports
import { useState, useRef } from "react";
import axios from "axios";
//Import Icons
import { FaPen, FaTrash, FaCheck } from "react-icons/fa";
import { BsXLg } from "react-icons/bs";
//Import Components
import TextAreaInput from "../Text Area Input/TextAreaInput";
//Import Dependancies
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
//Import Styles
import "./NoteBox.styles.scss";

const NotesComponent = ({ note, fetchNotes }) => {
  //!Refs
  const noteBody = useRef(null);

  //!States
  const [createNoteFormMessage, setCreateNoteFormMessage] = useState();
  const [noteDeleteModal, setNoteDeleteModal] = useState(false);
  const [noteEditModal, setNoteEditModal] = useState(false);
  const [noteEditModalForm, setNoteEditModalForm] = useState({
    title: note.title,
    body: note.body,
  });

  //!Functions

  //Deleting
  const deleteNote = async (_id) => {
    //Delete the note
    const res = await axios.delete(`http://localhost:3000/notes/${_id}`);
    //Update State
    fetchNotes();
    setNoteDeleteModal(false);
  };
  const handleDeleteButton = () => {
    setNoteDeleteModal(true);
  };

  //Editing
  const handleEditButton = () => {
    setNoteEditModal(true);
  };

  const handleSubmitEditForm = async (e) => {
    try {
      e.preventDefault();
      //Send Axios Request with updated Note
      await axios.put(`http://localhost:3000/notes/${note._id}`, noteEditModalForm);

      setNoteEditModal(false);
      fetchNotes();
    } catch (err) {
      switch (err.response.data.error.code) {
        case 11000:
          setCreateNoteFormMessage("Note title is already in use!");
          setTimeout(() => {
            setCreateNoteFormMessage(null);
          }, 3000);
          break;
        default:
          setCreateNoteFormMessage(err.response.data.error);
          setTimeout(() => {
            setCreateNoteFormMessage(null);
          }, 3000);
      }
    }
  };

  const handleNoteEditModalForm = (e) => {
    const { value, name } = e.target;
    setNoteEditModalForm({
      ...noteEditModalForm,
      [name]: value,
    });
  };

  //!Rendering
  return (
    <div>
      {/* Modal after clicking the edit button */}
      {noteEditModal && (
        <div className="note-box-edit-modal">
          {createNoteFormMessage && <p className="errorMessage">{createNoteFormMessage}</p>}
          <form onSubmit={handleSubmitEditForm}>
            <input
              value={noteEditModalForm.title}
              onChange={handleNoteEditModalForm}
              name="title"
            />
            <TextAreaInput
              functionality="edit"
              setCreateNoteForm={setNoteEditModalForm}
              createNoteForm={noteEditModalForm}
              handleCreateNoteForm={handleNoteEditModalForm}
              style={{ height: `calc(${noteBody.current?.clientHeight}px + 3.5rem)` }}
            />

            <div className="note-footer">
              {note.updatedAt !== note.createdAt ? (
                <p>Updated at {new Date(note.updatedAt).toLocaleString("en-US")}</p>
              ) : (
                <p>Created at {new Date(note.createdAt).toLocaleString("en-US")}</p>
              )}
            </div>
            <div className="btns-wrapper">
              <button
                className="btn btn__cancel"
                onClick={() => {
                  setNoteEditModal(false);
                }}
              >
                <span>
                  <BsXLg />
                </span>
              </button>
              <button className="btn btn__update" type="submit">
                <span>
                  <FaCheck />
                </span>
              </button>
            </div>
          </form>
        </div>
      )}
      {!noteEditModal && (
        <div className="note-box" key={note._id}>
          {/* Modal after clicking the delete button */}
          {noteDeleteModal && (
            <div className="note-box-confirm-modal">
              <h2>Are you sure you want to delete this?</h2>
              <div className="modal-btns-wrapper">
                <button onClick={() => setNoteDeleteModal(false)}>Cancel</button>
                <button onClick={() => deleteNote(note._id)}>
                  Delete
                  <i>
                    <FaTrash />
                  </i>
                </button>
              </div>
            </div>
          )}

          {/* The actual Note */}
          <h3>{note.title}</h3>
          <div className="line-divider"></div>
          <p ref={noteBody}>
            <ReactMarkdown children={note.body} remarkPlugins={[remarkGfm]} />
          </p>
          <div className="note-footer">
            <div className="note-tag">Food</div>
            {note.updatedAt !== note.createdAt ? (
              <p>Updated at {new Date(note.updatedAt).toLocaleString("en-US")}</p>
            ) : (
              <p>Created at {new Date(note.createdAt).toLocaleString("en-US")}</p>
            )}
          </div>
          <div className="btns-wrapper">
            <button className="btn edit" onClick={handleEditButton}>
              <span>
                <FaPen />
              </span>
            </button>
            <button className="btn delete" onClick={handleDeleteButton}>
              <span>
                <FaTrash />
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesComponent;
