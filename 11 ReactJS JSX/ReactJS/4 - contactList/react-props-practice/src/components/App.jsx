import React from "react";
import Card from "./Card";
import Avatar from "./Avatar";

import contacts from "../contacts.js";

// Method #1
/********************************************************************* */
/*
function App() {
  let cards = [];
  let i = 0;

  // Copy data from contacts.js to array (alternative is to get from MongoDB database)
  contacts.forEach(function(contact) {
    cards[i] = <Card name={contact.name} imgURL={contact.imgURL} phone={contact.phone} email={contact.email} />;
    i++;
  });
  
  return (
    <div>
      <h1 className="heading">My Contacts</h1>
      <Avatar imgURL="/images/michael.jpg" />
      {cards}
    </div>
    
  );
}
*/

// Method #2
/******************************************************************************** */
// Create a function for use with the .map() function 
// key is required so that one property is guaranteed to have a unique value for all components
// props.key cannot be used as a property as it is protected (you can't show it)
function createCard(contact) {
  return (
    <Card 
      key={contact.id}
      name={contact.name} 
      imgURL={contact.imgURL} 
      phone={contact.phone} 
      email={contact.email} 
    />
  );
}

function App() {
  // .map() data to each component (from contacts to each card). For each contact call the createCard function (which creates a card using the contacts data) 
  return (
    <div>
      <h1 className="heading">My Contacts</h1>
      <Avatar imgURL="/images/michael.jpg" />
      {contacts.map(createCard)}
    </div>
    
  );
}
export default App;
