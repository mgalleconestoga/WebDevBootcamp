// > npm start to run
import React from "react";
import Entry from "./Entry";
import emojipedia from "../emojipedia";

function createEntry(emojiEntry) {
  return (
    <Entry 
      key={emojiEntry.id}
      emoji={emojiEntry.emoji}
      name={emojiEntry.name} 
      meaning={emojiEntry.meaning}
    />
  );
}

// Use the .map() function to map the data from the database/file to the component(s)
function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>

      <dl className="dictionary">
        {emojipedia.map(createEntry)}
      </dl>
    </div>
  );
}

export default App;
