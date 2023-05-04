// touch app.js
// npm init
// code .   (open VS Code in the current directory - i.e. fruitsproject)
// npm install mongoose
// Start the mongoDB server by opening a new terminal and running: > mongod
// Run: node app.js  OR nodemon app.js 

// Mongoose docs available at: https://mongoosejs.com/docs/guide.html
const mongoose = require("mongoose");                                       // npm install mongoose.

// Connection URL of server
const url = "mongodb://localhost:27017";                                    // mongodb is listening at port 27017 (on the local system here) by default

// Create connections to each database using mongoose (Note: Need to start the server side (using command 'mongod' mongo daemon (server)) for this client to connect)
// fruitsdb
const connectionToFruitsDB = mongoose.createConnection(url + "/fruitsdb");   // Connection to database (if does not exist then it will be created automatically)
const fruitSchema = new mongoose.Schema({ name: String, rating: Number, review: String, }); // Schema (collection structure/data type)
const Fruit = connectionToFruitsDB.model("fruit", fruitSchema);              // Model: Constructor connects to 'fruits' (automatically pluralized) collection using the 'fruitSchema' schema

// peoplesdb
const connectionToPeoplesDB = mongoose.createConnection(url + "/peoplesdb");// Connection to database
const peopleSchema = new mongoose.Schema({                                  // Schema (a collections structure / data type)
  name: { type: String, required: [true, "Error: name is required"] },      // VALIDATION: If data INSERTED does not have a name then it will not be added and error will be shown. For details see: https://mongoosejs.com/docs/validation.html
  age: { type: Number, min: 1, max: 100, required: [true, "Error: age is required"]},
  favFruit: fruitSchema,                                                    // A Schema is like a data type. You can embed an document (object) inside another in this way
});
const People = connectionToPeoplesDB.model("people", peopleSchema);         // Model: Constructor that connects to people(s)' (automatically pluralized) collection using the 'peopleSchema' schema

/****** CRUD examples ***************/
// You should run the CRUD operations one at a time - JavaScript is synchronous so all function calls happen at the same time and you don't know which order they will complete

// CREATE (INSERT):
/* ************************* */
// Single document insert: via the .save() method of the document
const apple = new Fruit({
  name: "apple",
  rating: 9,
  review: "Tastes great!",
});                                                                         // Create a new 'document' that follows the colletion schema
apple.save(); // INSERT the new document into the collection

// Bulk document insert: INSERT many documents to collection defined by Model using the Models methods (these are similar to the native NodeJS MongoDB methods. See https://mongoosejs.com/docs/models.html for details) (Here we show the .addMany() method)
const banana = new Fruit({ name: "banana", rating: 6, review: "Awesome" });             // sample document
const strawberry = new Fruit({ name: "strawberry", rating: 9, review: "Great",});       // sample document
const tomato = new Fruit({ name: "tomato", rating: 1, review: "Yuk" });                 // sample document
Fruit.insertMany([banana, strawberry, tomato], function (err) {
  // Use Model.insertMany() method - these are based on NodeJS MongoDB native methods
  if (err) {
    console.log(err);
  } else {
    console.log(
      "Successfully inserted the documents to fruits collection in fruitsdb database"
    );
  }
});

// Example 2 - Create and Insert documents into second database (given by a different connection) - note this is not just a different collection in the same database but another database altogether
const person = new People({ name: "Mike", age: 50, favFruit: apple }); // Create a document (object) associated with the 'peoples' collection
person.save().then(() => {
  console.log(
    "Successfully inserted the document into peoples collection in the peoplesdb database"
  );
}); // INSERT the new data into the 'peoples' collection in the 'peopledb' database

const person2 = new People({ name: "Ali", age: 50, favFruit: banana });
person2.save().then(() => {
  console.log("Ali created with favFruit banana");
}); // INSERT the new data into the 'peoples' collection in the 'peopledb' database


// READ: via the .find() method of the Model
/************************************************ */
Fruit.find(function (err, data) {
  // Note: callback function is called after the find function completes
  if (err) {
    console.log(err);
  } else {
    //console.log(data);
    console.log("\nFruits in the fruits collection in the fruitsdb database");
    data.forEach((document) => { console.log(document.name); });           // Each element in the array is a document (object)

    // Once we have retireved the data we can close the connection
    // connectionToFruitsDB.close(() => { console.log("Connection to fruitsdb closed")});
  }
});

People.find(function (err, data) {
  if (err) {
    console.log(err);
  } else {
    //console.log(data);
    console.log(
      "\nPeople in the peoples collection in the peopledb database (and their favorite fruit)"
    );
    data.forEach(function (document) {
      // Alternative syntax
      console.log(document.name + " " + document.favFruit);
    });

    // Once we have retireved the data we can close the connection
    // connectionToPeoplesDB.close(() => { console.log("Connection to peoplesdb closed")});
  }
});

// UPDATE: via the .updateOne() method of the Model (could also use updateMany()) - See: https://mongoosejs.com/docs/api.html#model_Model.updateOne
/*************************************************************************************************** */
Fruit.updateOne({ name: "apple" }, { name: "pear" }, function (err) {
  // Look for name: "apple" and update to name: "pear"
  if (err) {
    console.log(err);
  } else {
    console.log("\nSuccessfully updated the document");
    // connectionToFruitsDB.close(() => {
    //     console.log("Successfully updated the document");
    //     console.log("Connection to fruitsdb closed");
    // });
  }
});

// DELETE: via the .deleteOne() / .deleteMany() method of the Model - See: https://mongoosejs.com/docs/models.html#deleting
/*************************************************************************************************** */
Fruit.deleteOne({ name: "banana" }, function (err) {
  // can select a particular _id for a specific document
  if (err) {
    console.log(err);
  } else {
    // Timing issue - wait 1 second to before closing connection so it does not close before the above functions run. Could alternatively put everytthing inside and async function and use await
    setTimeout(function () {
      connectionToFruitsDB.close(function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log(
            "Successfully deleted the document in the fruits collection"
          );
          console.log("Connection to fruitsdb closed");
        }
      });
    }, 1000);
  }
});

People.deleteMany({ name: "Mike" }, function (err) {
  if (err) {
    console.log(err);
  } else {
    // Timing issue - wait 1 second to before closing connection so it does not close before the above functions run. Could alternatively put everytthing inside and async function and use await
    setTimeout(function () {
      connectionToPeoplesDB.close(function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log(
            "Successfully deleted documents from the peoples collection"
          );
          console.log("Connection to peoplesdb closed");
        }
      });
    }, 1000);
  }
});

// Some command line stuff to clear out and search the database/collection(s)
// show dbs
// use <db name>
// show collections
// db.<collection name>.drop()         // Deletes the collection
// db.dropDatabase()                   // Must have the database selected via use <database name>
// da.<collection name>.find()         // Show all documents in the collection
