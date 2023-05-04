// Use expressJS
const express = require("express"); // npm init && npm install express
const https = require("https"); // Native node module for making http/https requests - don't need to npm install it
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Set up GET response for the app/website
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// Set up a POST response for the app/website
app.post("/index.html", function (req, res) {
  const query = req.body.city;                       // req.body contains the data submitted in the form request in index.html. 'city' is a name from the form in index.html passed to the POST array (req.body.{element of POST array})
  
  // Get the data from the API via an https get request
  const apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  const units = "metric";
  const appid = "6dbd52a8167de375167d08f24a586050";
  const url = apiEndPoint + "?q=" + query + "&units=" + units + "&appid=" + appid;
  
  https.get(url, function (response) {
    console.log(response.statusCode);
    // Make a get request to the API website using the https object
    response.on("data", function (data) {
      // on() is a method of the response object that was passed to the callback function in the get() method [of the https object]
      const weatherData = JSON.parse(data); // Parse the returned data into JSON format (data is in HEX format)
      console.log(weatherData); // Show contents of JSON parsed data

      // Sample info from the JSON parsed weatherData
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const iconID = weatherData.weather[0].icon;
      const iconLoc = "http://openweathermap.org/img/wn/" + iconID + "@4x.png";
      const city = weatherData.name;

      // Respond to the GET request on our app/website using the res object in the app.get() callback function
      res.write(
        "<h1>The temperature in " +
          city +
          " is " +
          temp +
          " degrees celsius</h1>"
      );
      res.write("<img src='" + iconLoc + "' />");
      res.write("<p>" + description + "</p>");
      res.send(); // Can only have one response [i.e. res.send()] per app.get() request so use res.write() until ready to send
    });
  });
});

// Set up listening port
app.listen(3000, function () {
  console.log("Server has started on port 3000");
});
