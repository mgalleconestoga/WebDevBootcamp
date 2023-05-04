// touch app.js
// npm init
// code .   (open VS Code in the current directory - i.e. fruitsproject)
// npm install mongodb
// Run: node app.js

// Connect to server and database (Note: Need to start the server (using command 'mongod') for this client to connect)
const MongoClient = require('mongodb').MongoClient;             // npm install mongodb. Note: alternative is 'import { MongoClient } from "mongodb";'
const assert = require('assert');                               // use the assert package for testing/validation

// Connection URL of server
const url = 'mongodb://localhost:27017';                        // mongodb is listening at port 27017 (on the local system here) by default

// Select database and collection name
const dbname = 'fruitsdb';
const colname = 'fruits';

// Create a new MongoClient
const client = new MongoClient(url);                            // Instantiate the mongoclient using the Mongoclient constructor and the url of the server

// Insert parameters and options (for the insertMultDocs() function below)
const documentsToInsert = [
    {fruit: "pineapple"},
    {fruit: "strawberry"},
    {fruit: "apple"}
];
const insertOptions = {ordered: true};                      // Prevent additional documents from being inserted if one fails 

// Search parameters and options (for the findMultDocs() function below)
const query = {fruit: "apple"};                             // This is the search parameter
const options = { 
    // Sort in ascending order by fuit name
    sort: { fruit: 1},
    // Exclude the id but show the fruit field
    projection: {_id: 0, fruit: 1}                  
};


/****** asynch / await method for running JavaScript asynchronously (i.e. not-synchrounously, as in not at the same time but waiting for things to finish) */ 
async function insertMultDocs(docs, options) {
    try {                                                               // Promises must return when they complete so something must catch them when they succed or fail (so we use a try/catch)
        await client.connect();
        const database = client.db(dbname);
        const col = database.collection(colname);   

        // Run the insertMany() method of the collection
        const result = await col.insertMany(docs, options);
        console.log(result.insertedCount + " documents were inserted");

    } catch (error) {
        console.error(error);                                   // Display the error (async returns a promise that needs to complete so it must return something when it does)
    } finally {
        await client.close();
    }
}

async function findMultDocs(query, options) {
    try {                                                       // Promises must return when they complete so something must catch them when they succed or fail (so we use a try/catch)  
        await client.connect();
        const database = client.db(dbname);
        const col = database.collection(colname);   

        // Run the search using the find() method of the collection
        const cursor = col.find(query, options);                // The find() method returns a FindCursor that manages the results of the query. We can iterate through the results using next(), toArray() or forEach(). If no documents match then find() returns an empty cursor

        // Display a message if empty cursor (no documents match the query)
        if((await cursor.countDocuments) === 0) {             // wait for the find() to complete ('await')
            console.log("No documents found that mathc your search");
        }

        // Display the documents to the console
        await cursor.forEach(console.dir);

    } catch (error) {
        console.error(error);                                   // Display the error (async returns a promise that needs to complete so it must return something when it does)
    } finally {
        await client.close();
    }
}

// Run these function calls asynchronously
async function prog() {                                                 // This function is asynchronous (do things one at a time and 'await' completion before moving to the next step)
    try {
        await insertMultDocs(documentsToInsert, insertOptions);         // Wait  for this to finish
        await findMultDocs(query, options);                             // Then do  this         
    } catch (error) {
        console.error(error);
    }
};

// Run the program
prog();

/********** Old way of doing this that uses callbacks ********************** */

/* 
// Use the connect() method of the new client to connect to the server and database
client.connect( function(err) {
    assert.equal(null, err);                                    // Ensure there is NO error passed back to the callback function
    console.log("Connected successfully to server");
    const db = client.db(dbname);                               // select the database to connect to to using the db() method. This is equivalent to 'use <dbname>' at the command line

    // Do stuff here
    
    insertDocuments(db, function() { 
        client.close() 
    });                         // close the connection to the database  after inserting the documents
    
    findDocuments(db, function() { 
        client.close() 
    });                         // close the connection to the database  after finding the documents

});

// One way to insert documents into a collection. Another way is shown at: 
// 1. https://docs.mongodb.com/drivers/node/current/usage-examples/insertOne/        (insertOne())
// 2. https://docs.mongodb.com/drivers/node/current/usage-examples/insertMany/       (insertMany())   
const insertDocuments = function(db, callback) {
    // Get the specific collection
    const collection = db.collection(colname);                  // Get the collection colname = 'fruits'
    // Insert the documents
    collection.insertMany( [{fruit: "apple"}, {fruit: "pear"}, {fruit: "banana"}], function(err, result){
        assert.equal(err, null);                                // Make sure no error
        assert.equal(3, result.insertedCount);                       // Make sure 3 documents have been added
        console.log("Inserted 3 documents into the collection");
        callback(result);                                       // Function to call once this completes (usually client.close())
    });
}

// One way to find documents in a collection. Alternate (async await based asynchronous way) is shown at: https://docs.mongodb.com/drivers/node/current/usage-examples/find/ 
const findDocuments = function(db, callback) {
    // Get the specific collection
    const collection = db.collection(colname);                  // Get the collection colname = 'fruits'
    // Find the documents
    collection.find({}).toArray(function(err, docs){            // This is the
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });               
} 

*/