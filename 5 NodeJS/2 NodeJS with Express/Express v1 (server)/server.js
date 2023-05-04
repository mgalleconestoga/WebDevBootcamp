//jshint esversion:6
const express = require("express");					// npm init && npm install express

const app = express();

app.get("/", function(req, res) {                   // main page route
    //console.log(request);
    res.send("<h1>Hello world</h1>");
})

app.get("/contact.html", function(req, res) {       // contact page route
    //console.log(req);
    res.send("<h1>Contact Me</h1>");
});

app.get("/about.html", function(req, res) {         // about page route
    //console.log(request);
    res.send("<h1>About Me</h1>");
});

app.get("/calculator.html", function(req, res) {         // about page route
    //console.log(request);
    res.send("<h1>Calculator</h1>");
});

app.listen(3000, function() { 
    console.log("Server has started on port 3000");  
}); 