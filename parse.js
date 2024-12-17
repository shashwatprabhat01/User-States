const fs = require('fs');
const { MongoClient } = require('mongodb');

// Path to the JSON file
const jsonFilePath = 'output_userStates.json';

// MongoDB connection URI for local MongoDB
const uri = 'mongodb://localhost:27017';  // Local MongoDB URL

// Database and collection names
const dbName = 'local';
const collectionName = 'User States';

// Function to insert data into MongoDB
async function insertDataIntoMongo(jsonData) {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Insert parsed JSON data into the collection
    const result = await collection.insertMany(jsonData);
    console.log(`${result.insertedCount} documents were inserted`);

  } catch (err) {
    console.error('Error inserting data into MongoDB:', err);
  } finally {
    await client.close();
  }
}

// Read and parse the JSON file, then populate it into MongoDB
fs.readFile(jsonFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the JSON file:', err);
    return;
  }

  try {
    // Parse the JSON data
    const parsedData = JSON.parse(data);

    // Populate the data into MongoDB
    insertDataIntoMongo(parsedData);

  } catch (parseErr) {
    console.error('Error parsing the JSON file:', parseErr);
  }
});
