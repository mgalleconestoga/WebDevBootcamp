import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import notes from "../notes";

function App() {
  return (
    <div>
      <Header />
      {notes.map(note => <Note title={note.title} content={note.content} key={note.key} />)}
      <Footer />
    </div>
  );
}

/*
// Alternative (longer) - create a function to pass the objects to via map()
// Note: The previous method is more succinct
function createNote(noteItem) {
  return <Note title={noteItem.title} content={noteItem.content} />;
}

function App() {
  return (
    <div>
      <Header />
      {notes.map(createNote)}
      <Footer />
    </div>
  );
}
*/

export default App;
