
const { MongoClient } = require('mongodb');

// MongoDB connection URI and database/collection name
const uri = 'mongodb://localhost:27017';
const dbName = 'local';  
const collectionName = 'UserStates';  

// Function to connect to MongoDB and count users by OS
async function countUsersByOS() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Step 1: Get the total number of users
    const totalUsers = await collection.countDocuments();
    console.log(`Total number of users: ${totalUsers}`);

    // Step 2: Get all distinct states from the "osType" field
    const distinctOS = await collection.distinct("osType");

    // Step 3: Loop through each distinct state and count the users, then calculate the percentage
    for (let state of distinctOS) {
      const count = await collection.countDocuments({ "osType": state });
      const percentage = ((count / totalUsers) * 100).toFixed(2); // Calculate percentage and round to 2 decimal places
      console.log(`osType: ${state}, User Count: ${count}, Percentage: ${percentage}%`);
    }

  } catch (err) {
    console.error('Error occurred:', err);
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}
// Run the script
countUsersByOS();
