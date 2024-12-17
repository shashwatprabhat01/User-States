const fs = require('fs');
const csv = require('csv-parser');

const inputFilePath = 'userStates.csv';  // Path to your input CSV file
const outputFilePath = 'output_userStates.json';  // Path to the output JSON file

// Function to convert CSV to JSON
function convertCsvToJson(inputFile, outputFile) {
  const results = [];

  // Create a readable stream to read the CSV file
  fs.createReadStream(inputFile)
    .pipe(csv())  // Pipe the stream into the CSV parser
    .on('data', (row) => {
      results.push(row);  // Push each row into the results array
    })
    .on('end', () => {
      // Write the results array to a JSON file
      fs.writeFileSync(outputFile, JSON.stringify(results, null, 2), 'utf-8');
      console.log(`CSV data has been successfully converted to ${outputFile}`);
    })
    .on('error', (err) => {
      console.error('Error reading the CSV file:', err);
    });
}

// Call the function with the input and output file paths
convertCsvToJson(inputFilePath, outputFilePath);
