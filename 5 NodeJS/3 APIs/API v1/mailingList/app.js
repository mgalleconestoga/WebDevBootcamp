const express = require("express");             // npm install express
const https = require("https");                 // npm install https
const app = express();                          // Constructor to create an express app

// url encoding and JSON format
app.use(express.json());                        // data is JSON encoded
app.use(
  express.urlencoded({                          // Allows use of req.body to read submitted data from the body get/post array
    extended: true,
  })
);

// Place supporting files (e,g images, CSS, JS files) in a location (i.e. 'public' folder that they can be served from (called 'static' files)
app.use(express.static("public"));              // 'public' is the name of the folder with files that are publicly accessible. It is now the new root directory

// SERVER: Respond to GET requests
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/signup.html", function(req, res) {
    const fname = req.body.fname; 
    const lname = req.body.lname;
    const email = req.body.email;
    // console.log(fname, lname, email);

    // Mailchimp API has specific keys that it accepts for the key-value pairs (requires key members: [ { JSON object with specific/allowable keys }, { JSON object }, ... ]  )
    const data = {
        members: [ { email_address: email, status: "subscribed", merge_fields: {FNAME: fname, LNAME: lname }   } ]
    };

    // Since data is a JavaScript object we need to convert it to a string in the form of JSON
    const jsonData = JSON.stringify(data); 

    // We now want to use the HTTPS module to make a POST request to POST data to mailchimp (uses https.request)
    // Previously we used the https.get() module to just get data but now we want to post data to mailchimp

    const url = "https://us14.api.mailchimp.com/3.0/lists/6d1abd257b";
    const options = {
        method: "POST",                         // This is used by the https.request() to make a POST instead of GET (which is default)
        auth: "michael1:56df47bafe3adfac5582e1ad173874e8-us14"     // <anystring>:apikey    (make sure no spaces after colon)
    };  

    // First make a request to add data to the Mailchimp server
    const request = https.request(url, options, function(response){     // Response object is received after request
        response.on("data", function(data) {            // Response object passes data to the callback function into 'data'
            console.log(JSON.parse(data));              // parse the response to the request to add data in JSON form and show it (make sure the request was accepted by their server)
        });

        //console.log(response.statusCode);
        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

    });

    // Use the request to send the data to Mailchimp server
    request.write(jsonData);                            // Actually send the data
    request.end();                                      // specify that the request in completed


});

app.post("/failure.html", function(req, res) {
    //res.sendFile(__dirname + "/signup.html");         // This sends the file for signup but keeps the route as localhost:3000/failure.html
    res.redirect("/");                                  // Better Alternative - redirect to home route - This ACTUALLY passes the request to app.get("/", function(req, res) and changes the route back to localhost:3000/ and sends signup.html
});

// Local development listening port
/*
app.listen(3000, function() {                           // Set up a listening port locally - use port 3000
    console.log("Server is listening on port 3000"); 
});
*/

// Set up app so that it will work on Heroku - Heroku might not want to listen to port 3000 so we need to allow then to set a listening port
app.listen(process.env.PORT || 3000, function() {       // Set up a listening port using the process object (produced and defined by Heroku) - Also allow for local development by adding 'or' port 3000
    console.log("Server is listening on port 3000"); 
});

// API Key for mailchimp:  56df47bafe3adfac5582e1ad173874e8-us14
// Audience list ID: 6d1abd257b