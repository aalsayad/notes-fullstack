import { useState, useEffect } from "react";
import axios from "axios";
import { FaStickyNote, FaSearch } from "react-icons/fa";
import { BiSortAlt2 } from "react-icons/bi";
import "./App.scss";
import NotesComponent from "./Components/Notes/NotesComponent";
import CreateNewNoteSection from "./Components/CreateNewNoteSection/CreateNewNoteSection";

const App = () => {
  //States
  const [notes, setNotes] = useState([]);
  const [createNoteForm, setCreateNoteForm] = useState({
    title: "",
    body: "",
    tag: "",
    color: "#E5E8D4",
  });
  const [sortOption, setSortOption] = useState("latest");
  const [searchBar, setSearchBar] = useState("");

  //UseEffect
  useEffect(() => {
    fetchNotes();
  }, [createNoteForm, sortOption, searchBar]);

  const fetchNotes = async () => {
    //Fetch the notes using axios
    const res = await axios.get("http://localhost:3000/notes");
    const data = res.data;

    //Sorting based on selection of Sorting Option DropDown
    if (sortOption === "latest") {
      const sortedData = data.sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );

      //filter by search state
      const filteredData = sortedData.filter(
        (note) =>
          note.title.toLocaleLowerCase().includes(searchBar.toLocaleLowerCase()) ||
          note.body.toLocaleLowerCase().includes(searchBar.toLocaleLowerCase())
      );

      //Set to state after sorting & Filtering by latest
      setNotes(filteredData);
    }
    if (sortOption === "oldest") {
      const sortedData = data.sort(
        (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
      );
      //filter by search state
      const filteredData = sortedData.filter(
        (note) =>
          note.title.toLocaleLowerCase().includes(searchBar.toLocaleLowerCase()) ||
          note.body.toLocaleLowerCase().includes(searchBar.toLocaleLowerCase())
      );

      //Set to state after sorting & Filtering by latest
      setNotes(filteredData);
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    fetchNotes();
  };

  return (
    <>
      <div className="section-container">
        <div className="section-heading-icon">
          <div className="section-icon">{<FaStickyNote />}</div>
          <h2 className="section-heading">My notes</h2>
        </div>

        {/* Sorting & Searching */}
        <div className="notes-control-bar">
          <div className="notes-search-bar">
            <input
              placeholder="Search for note . . ."
              value={searchBar}
              onChange={(e) => {
                setSearchBar(e.target.value);
              }}
            />
            <span>
              <FaSearch />
            </span>
          </div>

          <div className="notes-sorting-bar">
            <span>
              <BiSortAlt2 />
            </span>
            <label>Sort By</label>
            <select type="select" onChange={handleSortChange}>
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              {/* <option value="favorite">Favorite</option> */}
            </select>
          </div>
        </div>

        {/*Display All Notes*/}

        {notes.length !== 0 ? (
          notes.map((note) => <NotesComponent key={note._id} note={note} fetchNotes={fetchNotes} />)
        ) : (
          <p>loading your notes</p>
        )}
      </div>

      {/* Create New Note Modal */}
      <CreateNewNoteSection setCreateNoteForm={setCreateNoteForm} createNoteForm={createNoteForm} />
    </>
  );
};

export default App;
