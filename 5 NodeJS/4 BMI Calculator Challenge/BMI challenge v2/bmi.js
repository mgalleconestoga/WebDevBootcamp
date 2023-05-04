// npm init
// sudo npm install -g nodemon                                  // auto start server with every save of JS file see: https://nodemon.io - Only need to install this once and it will be available to all projects on your computer
// nodemon bmi.js                                               // start nodemon to listen for changes in server.js and restert server

const express = require("express");                             // include the express package (installed via > npm install express)
const bodyParser = require("body-parser");                      // include the body-parser package (installed via > npm install body-parser) which contains methods for accesing submitted form data 

app = express();                                                // Construct the app object using the express() constructor
app.use(bodyParser.urlencoded({extended: true}));               // Include the body-parser functionality so form data may be retrieved

// Set up the routes 
app.get("/", function(req, res){                                // GET request for the root         
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.get("/bmiCalculator", function(req, res){                   // GET request for the /bmiCalculator route         
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmiCalculator", function(req, res){                  // POST request to the /bmicalculator page
    // Data from form is in the req.body object and we can access the data using the 'name: value' pairs in the form
    var height = parseFloat(req.body.height);                       // Convert text to a float to compute result
    var weight = parseFloat(req.body.weight);
    var bmi = weight / Math.pow(height, 2);
    res.send("Your BMI is: " + bmi);
});

// Start the server
app.listen(3000, function(){
    console.log("Server started on port 3000");
});
