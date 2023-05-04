import React, { useState } from "react";

function App() {
  let time = new Date().toLocaleTimeString();
  console.log(time);
  const [currTime, setTime] = useState(time);       // Initialize value of state variable, name the function to change the value of the state variable

  function getTime() {
    setTime(new Date().toLocaleTimeString());
  }

  // Update every 5 seconds
  setInterval(getTime, 5000);

  // Update on click
  return (
    <div className="container">
      <h1>{currTime}</h1>
      <button onClick={getTime}>Get Time</button>
    </div>
  );
}

export default App;
