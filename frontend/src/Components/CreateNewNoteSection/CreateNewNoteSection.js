//!imports
import { useState } from "react";
import axios from "axios";
//Icons Imports
import { FaPlus } from "react-icons/fa";
import { BsXLg } from "react-icons/bs";
//Components Import
import TextAreaInput from "../Text Area Input/TextAreaInput";
import NoteTagSection from "../NoteTags/NoteTagSection";
//Styles Import
import "./CreateNewNote.styles.scss";

//!RAFCE
const CreateNewNoteSection = ({ setCreateNoteForm, createNoteForm }) => {
  //!States
  const [createNoteFormMessage, setCreateNoteFormMessage] = useState();
  const [addNoteFormModal, setAddNoteFormModal] = useState(false);

  const handleCreateNoteForm = (e) => {
    const { name, value } = e.target;
    setCreateNoteForm({
      ...createNoteForm,
      [name]: value,
    });
  };

  //!Functions
  //Submitting the form
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
        setAddNoteFormModal(false);
      }, 500);
    } catch (err) {
      switch (err.response.data.error.code) {
        case 11000:
          setCreateNoteFormMessage("Note title is already in use!");
          setTimeout(() => {
            setCreateNoteFormMessage(null);
          }, 3000);
          break;
        default:
          setCreateNoteFormMessage(err.response.data.error.message);
          setTimeout(() => {
            setCreateNoteFormMessage(null);
          }, 3000);
      }
    }
  };

  //!Rendering
  return (
    <>
      <div className="section-heading-icon" onClick={() => setAddNoteFormModal(true)}>
        <div className="plus-icon">
          <span className="plus__sign"> {<FaPlus />} </span>
          <div className="plus__text">
            <h3>Create a new note</h3>
          </div>
        </div>
      </div>
      {addNoteFormModal && (
        <div className="fullscreen-modal__newnote">
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
            <TextAreaInput
              functionality="create"
              setCreateNoteForm={setCreateNoteForm}
              createNoteForm={createNoteForm}
              handleCreateNoteForm={handleCreateNoteForm}
            />
            <NoteTagSection setCreateNoteForm={setCreateNoteForm} createNoteForm={createNoteForm} />
            <button type="submit">Create Note</button>
            <div className="new-note__close-icon" onClick={() => setAddNoteFormModal(false)}>
              <span>
                <BsXLg />
              </span>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default CreateNewNoteSection;
