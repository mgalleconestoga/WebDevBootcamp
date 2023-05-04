import React, { useState } from "react";     // Direct import of { useState } method from React module

function App() {
  //const state = React.useState();         // Indirect import
  //const state = useState(0);              // Initialized value of first array element is set to 0 (can be any number you want)
  //console.log(state);                     // Show content of state which is an array of two items [pointer, function pointer] produced by the useState() function (which allocates the memory)
  
  // Using the useState() Hook: (Hooks can change value of state and re-render)
  // Syntax: const [state, setState] = useState(initialState) -- see: https://reactjs.org/docs/hooks-reference.html#usestate
  const [count, setCount] = useState(0);    // count is initial the value, setCount is the name (can be anything) of the function called to change it to a new value. Using 0 initializes 'count' to 0 when the app starts  

  function increase() {                     // Function inside App that updates  the variable
    // Change value and re-render
    setCount(count + 1);                    // Increment value of variable pointed to by count by using the function setCount() to both change it and re-render the page
  }

  function decrease() {                     // Function inside App that updates  the variable
    // Change value and re-render
    setCount(count - 1);                    // Increment value of variable pointed to by count
  }

  return (
      <div className="container">
        <h1>{count}</h1>
        <button onClick={increase}>+</button>
        <button onClick={decrease}>-</button>
      </div>
  );
}

export default App;
