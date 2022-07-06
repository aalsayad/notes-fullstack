import React from "react";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { BsXLg } from "react-icons/bs";
import TextAreaInput from "../Text Area Input/TextAreaInput";
import ColorSelectionSpan from "./ColorSelectionSpan";

const CreateNewNoteSection = ({ setCreateNoteForm, createNoteForm }) => {
  //States
  const [createNoteFormMessage, setCreateNoteFormMessage] = useState();
  const [addNoteFormModal, setAddNoteFormModal] = useState(false);

  const handleCreateNoteForm = (e) => {
    const { name, value } = e.target;
    setCreateNoteForm({
      ...createNoteForm,
      [name]: value,
    });
  };

  //Functions
  //!Submitting the form
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

  //Rendering
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
        <div className="fullscreen-modal">
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
            <div className="tag-options">
              <div className="first__tag-options">
                <label>Note Tag</label>
                <div className="note-tag-input" style={{ backgroundColor: createNoteForm.color }}>
                  <div className="input-div" contentEditable />
                </div>
              </div>
              <div className="second__tag-options">
                <label>Tag Color</label>
                <div className="all-colors">
                  <div className="color-row">
                    <ColorSelectionSpan
                      color="#E5E8D4"
                      setCreateNoteForm={setCreateNoteForm}
                      createNoteForm={createNoteForm}
                    />
                    <ColorSelectionSpan
                      color="#D9E8F0"
                      setCreateNoteForm={setCreateNoteForm}
                      createNoteForm={createNoteForm}
                    />
                    <ColorSelectionSpan
                      color="#F0D9EB"
                      setCreateNoteForm={setCreateNoteForm}
                      createNoteForm={createNoteForm}
                    />
                    <ColorSelectionSpan
                      color="#F9D9D9"
                      setCreateNoteForm={setCreateNoteForm}
                      createNoteForm={createNoteForm}
                    />
                    <ColorSelectionSpan
                      color="#D9F9DD"
                      setCreateNoteForm={setCreateNoteForm}
                      createNoteForm={createNoteForm}
                    />
                    <ColorSelectionSpan
                      color="#F8E9D2"
                      setCreateNoteForm={setCreateNoteForm}
                      createNoteForm={createNoteForm}
                    />
                    <ColorSelectionSpan
                      color="#D2F8F0"
                      setCreateNoteForm={setCreateNoteForm}
                      createNoteForm={createNoteForm}
                    />
                    <ColorSelectionSpan
                      color="#EAE0FB"
                      setCreateNoteForm={setCreateNoteForm}
                      createNoteForm={createNoteForm}
                    />
                  </div>
                </div>
              </div>
            </div>

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
