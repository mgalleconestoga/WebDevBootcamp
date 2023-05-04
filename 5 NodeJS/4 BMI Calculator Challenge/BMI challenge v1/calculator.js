//jshint esversion:6
                                               // npm install nodemon   (use "nodemon calculator.js" to run server that restarts after detecting changes to the js file )
const express = require("express");            // npm install express
const app = express(); 
app.use(express.json());
app.use(express.urlencoded({                   // parses the req.body text to get the POSTed data
    extended: true
}));

// Define routes to respond to GET requests

// Index page
app.get("/", function(req, res) {               // App page (root of webpage - i.e. localhost:3000)
    //res.send("Some text");              // sends specific text or html
    res.sendFile(__dirname + "/index.html");    // Sends a file (absolute path required so use constant __dirname to get the absolute path)
}); 

app.post("/index.html", function(req, res) {    // Respond to post requests to index.html (i.e. current page)
    //res.send("Thanks for POSTing");             // sends specific text or html

    // Calculations occur on the server rather than client-side
    console.log(req.body);                      // req.body contains the POSTed data in JSON form
    console.log("num1 is = " + req.body['num1']); 
    console.log("num2 is = " + req.body['num2']);  // Alternate method to get JSON data using the 'dot' operator 
    var resultAdd = parseInt(req.body['num1']) + parseInt(req.body['num2']);  // parseInt() converts a string to an integer
    console.log("num1 + num2 = " + resultAdd);

    // Alternative
    var num1 = Number(req.body.num1);           // Number() converts text to a number
    var num2 = Number(req.body.num2);   
    var result = num1 + num2; 
    console.log("num1 + num2 = " + result);

    res.send("The result is " + result); 

}); 

// bmiCalculator page
app.get("/bmiCalculator.html", function(req, res) {
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmiCalculator.html", function(req, res) {
    var weight = parseFloat(req.body.weight);
    var height = parseFloat(req.body.height); 
    var bmi = weight / (height ** 2); 
    res.send("Your BMI is = " + bmi);
});


// Listening port
app.listen(3000, function() {
    console.log("Server has started on port 3000")
}); 