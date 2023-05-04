// npm init
// sudo npm install -g nodemon                                  // auto start server with every save of JS file see: https://nodemon.io - Only need to install this once and it will be available to all projects on your computer
// nodemon server.js                                            // start nodemon to listen for changes in server.js and restert server

const express = require("express");                             // npm install express  see: https://expressjs.com 
const bodyParser = require("body-parser");                      // npm install body-parser   // Retrive data from HTML request

const app = express();
app.use(bodyParser.urlencoded({extended: true}));               // Get our app to use body-parser (which works with express) using the urlencoded() to parse data from an HTML form

// Set up response based on 'route'
// Root 
app.get("/", function(req, res){
    // console.log(req);                                        // The request object that was received
    res.send("<h1>Hello, world!</h1>");                         // The response object that can be returned
});

// Contact page
app.get("/contact", function(req, res){
    res.send("<h1>Contact Us</h1>");
});

// About page
app.get("/about", function(req, res){
    res.send("<h1>About Us</h1>");
});

// Calculator page (calculator application running JavaScript on server side)
// Respond with an HTML file 
app.get("/calculator", function(req, res){
    res.sendFile(__dirname + "/calculator.html");                // __dirname gives absolute path to current file
});

app.post("/calculator", function(req, res){                      // Post request - what to do with data 'post'ed by form submission
    // Get data from request using npm package body-parser
    //console.log(req.body);                                     // Show object submitted in the body of the post request
    var num1 = Number(req.body.num1);                            // Convert string to number 
    var num2 = Number(req.body.num2);                                      
    var result = num1 + num2;
    res.sendFile(__dirname + "/calculator.html");
    res.send("Answer: " + result);
});

// Start the server
app.listen(3000, function() {                                   // Port to listen on, callback function
    console.log("Server has started on port 3000");
});                           