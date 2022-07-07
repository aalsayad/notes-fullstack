//!imports
//import Components
import ColorSelectionSpan from "../NoteTags/ColorSelectionSpan";
//Import Styles
import "./NoteTagSection.styles.scss";

const NoteTagSection = ({ setCreateNoteForm, createNoteForm }) => {
  return (
    <>
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
    </>
  );
};

export default NoteTagSection;
