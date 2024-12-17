const { MongoClient } = require('mongodb');

// MongoDB connection URI and database/collection name
const uri = 'mongodb://localhost:27017'; 
const dbName = 'local';  
const collectionName = 'UserStates';  

// Function to connect to MongoDB and count users by state
async function countUsersByState() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Step 1: Get all distinct states from the "userState" field
    const distinctStates = await collection.distinct("userState");

    // Step 2: Loop through each distinct state and count the users
    for (let state of distinctStates) {
      const count = await collection.countDocuments({ "userState": state });
      console.log(`State: ${state}, User Count: ${count}`);
    }

  } catch (err) {
    console.error('Error occurred:', err);
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

// Run the script
countUsersByState();
