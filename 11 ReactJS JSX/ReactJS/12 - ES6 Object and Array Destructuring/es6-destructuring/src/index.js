// CHALLENGE: uncomment the code below and see the car stats rendered
import React from "react";
import ReactDOM from "react-dom";
import cars from "./practice";

// See the structure
console.log(cars);  

// Destructure the array into separate variables/objects
//const tesla = cars[0];            // Method #1
//const honda = cars[1];
const [tesla, honda] = cars;        // Method #2 (BETTER)

// Destructure required components of each object
// Method #1
//const teslaTopSpeed = tesla.speedStats.topSpeed;
//const teslaTopColour = tesla.coloursByPopularity[0];
//const hondaTopSpeed = honda.speedStats.topSpeed;
//const hondaTopColour = honda.coloursByPopularity[0];

// Method #2 (BETTER): Renaming properties in JSON object from 'model' to 'teslaModel' etc...) --- original name i.e. 'model' must match key in the object in the assignment below -- 
const {model: teslaModel, coloursByPopularity: teslaColoursByPopularity, speedStats: teslaSpeedStats, sound = "vroom"} = tesla;         // New 'sound' field added (not in original object) and given default value 
const teslaTopSpeed = teslaSpeedStats.topSpeed;         
const teslaTopColour = teslaColoursByPopularity[0];

const {model: hondaModel, coloursByPopularity: [hondaTopColour], speedStats: {topSpeed: hondaTopSpeed} } = honda;      // Another way to destructure further and rename fields
//const hondaTopSpeed = hondaSpeedStats.topSpeed;           // Integrated in line above
//const hondaTopColour = hondaColoursByPopularity[0];

ReactDOM.render(
  <table>
    <tr>
      <th>Brand</th>
      <th>Top Speed</th>
    </tr>
    <tr>
      <td>{tesla.model}</td>
      <td>{teslaTopSpeed}</td>
      <td>{teslaTopColour}</td>
    </tr>
    <tr>
      <td>{honda.model}</td>
      <td>{hondaTopSpeed}</td>
      <td>{hondaTopColour}</td>
    </tr>
  </table>,
  document.getElementById("root")
);
