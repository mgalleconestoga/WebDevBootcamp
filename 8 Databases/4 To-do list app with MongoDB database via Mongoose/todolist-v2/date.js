// module.exports (or just 'exports' for short) represents the JS OBJECT for everything in this file which will be exported when this file is 'include'ed in app.js
module.exports.getDate = getDate;           // Export our function as a METHOD of the OBJECT (use the function NAME on RHS of equal sign - like a function pointer)
//module.exports.getDay = getDay;           // Export function as member of the OBJECT exported

function getDate() {
    let today = new Date();                 // create a Date object with current date/time
    let date = "";                          // Variable to use in EJS template
    let day = "";                           // Variable to use in EJS template
    let data = [];
  
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };                                      // JSON object to format the string
    date = today.toLocaleDateString("en-US", options);      // Get day of week using JavaScript method toLocalDateString()
  
    // Get day of week from date string
    let commaLoc = date.indexOf(",");       // Location of the comma in the date string
    day = date.slice(0, commaLoc);          // Get day as the string of characters up to the comma in the date
    data = [day, date];
    return data; 
}

// Alternative: Use ANONYMOUS function (pass as PROPERTY instead of METHOD of OBJECT) 
exports.getDay = function() {
    const today = new Date();                 // create a Date object with current date/time - make const since it will not be changed
    const options = {                         // Options set to only return the day
      weekday: "long",
    };                                      // JSON object to format the string
    return today.toLocaleDateString("en-US", options);      // Get day of week using JavaScript method toLocalDateString() 
}

//console.log(module.exports);              // Shows the properties/methods exported under the OBJECT in this module