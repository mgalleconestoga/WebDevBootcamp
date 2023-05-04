/* weatherApp: Focus is on getting data using an API, using the npm module: express (urlencoded, json)
 *             and using the built-in module: https
 *             to make API get requests  
 * 
 */

// > npm init                                           // initialize node package 
// > nodemon app.js                                     // auto-restart the server   

// Include modules 
const express = require("express");                     // > npm install express
const bodyParser = require("body-parser");            // > npm install body-parser  (actually do not need this since we will use the one from express)
const https = require("https");                         // https is a native node module for making requests to external servers 

// Instantiate objects
app = express();                                        // Instantiate the app object

// Add components
app.use(bodyParser.urlencoded({extended: true}));       // Use the urlendoded() functionality to get data from body of form request
//app.use(express.urlencoded({extended: true}));        // Alternative: Use the urlencoding from the express module instead of from bodyParser (in previous example)
app.use(express.json());                                // Use the JSON object and methods from the express module

// Handle routes 
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    
    // Get data from form and set up endpoint, path and parameters for api call to get the weather for the requested city
    var city = req.body.city;                           // req.body object contains the form data submitted (city is the 'name' parameter in the form)
    var province = req.body.province;                   // req.body object available since we app.use(bodyParser.urlencoded())
    var country = req.body.country;                                           
    const apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";    // 'https://' is necessary
    const units = "metric";
    const appid = "6dbd52a8167de375167d08f24a586050";
    const url = apiEndPoint + "?q=" + city +"," + province + "," + country + "&units=" + units + "&appid=" + appid; 
    
    // Use the https object and its GET method to make the API request
    https.get(url, function(response){                                     // response object has on() method to indicate when data is returned and to receive the data in the callback function
        //console.log(response);
        
        response.on("data", function(data){                                // data object (in HEX format) passed to callback function. It needs to be converted to JSON format 
            const weather = JSON.parse(data);                              // parse received data into JSON format and create a JavaScript object (using the JSON objects parse() method)
            console.log(weather);                                          // weather is a JSON object (see console for details)
            console.log(JSON.stringify(weather));                          // can turn a JSON object into a string using JSON.stringify((object)) 
            // Sample properties in the weather object
            const temp = weather.main.temp;
            const description = weather.weather[0].description;
            const iconID = weather.weather[0].icon;
            const iconURL = "http://openweathermap.org/img/wn/" + iconID + "@4x.png";
            const cityname = weather.name;

            // Show the user the results using the write() method of the res object
            res.write("<h1>The temperature in " + cityname + " is " + temp + " degrees celsius </h1>");
            res.write("<img src='" + iconURL  +"' />");
            res.write("<p>" + description + "</p>");
            res.send();                                                     // Can only send() once per get() so use res.write() until ready to send everything  
        });

    }); 
});

app.listen(3000, function(){
    console.log("Server started on port 3000"); 
});