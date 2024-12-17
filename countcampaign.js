const { MongoClient } = require('mongodb');

// MongoDB connection URI and database/collection name
const uri = 'mongodb://localhost:27017';
const dbName = 'local';  
const collectionName = 'UserStates';  

// Function to connect to MongoDB and count users by utmCampaign
async function countUsersByCampaign() {
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

    // Step 2: Get all distinct campaigns from the "utmCampaign" field
    const distinctCampaigns = await collection.distinct("utmCampaign");

    // Step 3: Create an array to store campaign counts and percentages
    const campaignData = [];

    // Step 4: Loop through each distinct campaign and count the users, then calculate the percentage
    for (let campaign of distinctCampaigns) {
      // If the campaign is undefined or null, skip it
      if (campaign === null || campaign === undefined) continue;

      const count = await collection.countDocuments({ "utmCampaign": campaign });
      const percentage = ((count / totalUsers) * 100).toFixed(2); // Calculate percentage and round to 2 decimal places
      campaignData.push({ campaign, count, percentage });
    }

    // Step 5: Handle users without any "utmCampaign" (null or empty string)
    const countWithoutCampaign = await collection.countDocuments({ "utmCampaign": { $in: [null, ""] } });
    const percentageWithoutCampaign = ((countWithoutCampaign / totalUsers) * 100).toFixed(2);
    campaignData.push({ campaign: "Not specified", count: countWithoutCampaign, percentage: percentageWithoutCampaign });

    // Step 6: Sort the data by percentage in ascending order
    campaignData.sort((a, b) => parseFloat(a.percentage) - parseFloat(b.percentage));

    // Step 7: Log the sorted data
    for (let data of campaignData) {
      console.log(`utmCampaign: ${data.campaign}, User Count: ${data.count}, Percentage: ${data.percentage}%`);
    }

  } catch (err) {
    console.error('Error occurred:', err);
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

// Run the script
countUsersByCampaign();


