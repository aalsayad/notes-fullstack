import React from "react";

const ColorSelectionSpan = ({ color, setCreateNoteForm, createNoteForm }) => {
  return (
    <div>
      <span
        style={{ backgroundColor: color }}
        onClick={() => {
          setCreateNoteForm({ ...createNoteForm, color: color });
        }}
      />
    </div>
  );
};

export default ColorSelectionSpan;
