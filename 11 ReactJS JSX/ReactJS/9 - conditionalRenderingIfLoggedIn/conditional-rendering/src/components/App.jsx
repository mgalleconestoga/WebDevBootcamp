import React from "react";
import Login from "./Login";

var isLoggedIn = true;  // false

// Basic way to render conditionally using a function - React does NOT run STATEMENTS (for, if-else, etc) only EXPRESSIONS that evaluate to a single value
/* 
function renderConditionally(authenticated) {
  if(authenticated) {
    return (<h1>Hello</h1>);
  } else {
    return (<Login />);
  }
}

function App() {
  return (
    <div className="container">
      {renderConditionally(isLoggedIn)}
    </div>
  );
}
*/

// Better way to render conditionally using the TERNARY OPERATOR (an EXPRESSION that evaluates to a single value - This can run )
// TERNARY OPERATOR:  CONDITION ? DO IF TRUE : DO IF FALSE
/*
function App() {
  return (
    <div className="container">
      { isLoggedIn === true ? <h1>Hello</h1>  :  <Login /> }
    </div>
  );
}
*/

// Other types of conditions (show nothing using 'null')
/*
const currentTime = new Date(2030, 12, 1, 11).getHours();
function App() {
  return (
    <div className="container">
      { currentTime > 16 ? <h1>You need to stop working</h1>  :  null }
    </div>
  );
}
*/

// The && operator: (CONDITION1 && CONDITION2) (if CONDITION1 is false then it does not evaluate CONDITION2)
// CONDITION2 can be true always and then we can use CONDITION1 instead of the ternary operator
// true && ANY_ELEMENT = ANY_ELEMENT
// false && ANY_ELEMENT = false     - anything false or null is not rendered
const currentTime = new Date(2030, 12, 1, 17).getHours();
function App() {
  return (
    <div className="container">
      { (currentTime > 16) && <h1>You need to stop working</h1> }
      {false}
    </div>
  );
}

export default App;
