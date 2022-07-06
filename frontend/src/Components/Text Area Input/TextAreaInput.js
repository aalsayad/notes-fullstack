import { useState } from "react";
import { FaBold, FaItalic, FaRegImage, FaStrikethrough, FaLink, FaCheck } from "react-icons/fa";
import { BsXLg } from "react-icons/bs";

const TextAreaInput = ({
  setCreateNoteForm,
  createNoteForm,
  handleCreateNoteForm,
  functionality,
  style,
}) => {
  //!States
  const [textAreaFocused, setTextAreaFocused] = useState(false);
  const [selectedText, setSelectedText] = useState({
    value: "",
    start: 0,
    end: 0,
  });
  const [uploadImage, setUploadImage] = useState(false);
  const [uploadImageInput, setUploadImageInput] = useState("");

  //!Rich Text Editing
  const handleSelection = (e) => {
    const start = e.currentTarget.selectionStart;
    const end = e.currentTarget.selectionEnd;
    if (end - start !== 0) {
      setSelectedText({
        value: createNoteForm.body.slice(start, end),
        start: start,
        end: end,
      });
    }
  };

  //Bold/Italics/Underline/StrikeThrough
  const selectionToEdit = (action) => {
    const originalString = createNoteForm.body;

    const endString = originalString.slice(selectedText.end);
    const startString = originalString.slice(-0, selectedText.start);

    if (selectedText.value.length !== 0) {
      if (action === "bold") {
        const editedText = startString + `**${selectedText.value.trim()}**` + endString;
        setCreateNoteForm({
          ...createNoteForm,
          body: editedText,
        });
      }
      if (action === "italic") {
        const editedText = startString + `_${selectedText.value.trim()}_` + endString;
        setCreateNoteForm({
          ...createNoteForm,
          body: editedText,
        });
      }

      if (action === "strike") {
        const editedText = startString + `~${selectedText.value.trim()}~` + endString;
        setCreateNoteForm({
          ...createNoteForm,
          body: editedText,
        });
      }
    }

    if (action === "image") {
      const getCurrentString = originalString.slice(selectedText.length);
      const addedImageMarkup = getCurrentString + `![Image](${uploadImageInput})`;
      setCreateNoteForm({
        ...createNoteForm,
        body: addedImageMarkup,
      });
      setUploadImage(false);
    }
  };

  //!Rendering
  return (
    <>
      <div
        className={
          functionality === "edit"
            ? "textarea-container richtext__edit__container"
            : "textarea-container"
        }
      >
        {textAreaFocused && (
          <>
            <div className={functionality === "edit" ? "richtext richtext__edit" : "richtext"}>
              <div onClick={() => selectionToEdit("bold")}>
                <FaBold />
              </div>
              <div onClick={() => selectionToEdit("italic")}>
                <FaItalic />
              </div>
              <div onClick={() => selectionToEdit("strike")}>
                <FaStrikethrough />
              </div>
              <div
                onClick={() => setUploadImage((prevValue) => !prevValue)}
                className={uploadImage && "active-icon"}
              >
                <FaRegImage />
              </div>
            </div>
            {uploadImage && (
              <div className="richtext-popup">
                <span>
                  <FaLink />
                </span>
                <input onChange={(e) => setUploadImageInput(e.target.value)} />
                <span onClick={() => setUploadImage(false)}>
                  <BsXLg />
                </span>
                <span onClick={() => selectionToEdit("image")}>
                  <FaCheck />
                </span>
              </div>
            )}
          </>
        )}

        <textarea
          name="body"
          value={createNoteForm.body}
          type="text"
          onChange={handleCreateNoteForm}
          onSelect={handleSelection}
          onFocus={() => setTextAreaFocused(true)}
          style={functionality === "edit" ? style : null}
        />
      </div>
    </>
  );
};

export default TextAreaInput;
