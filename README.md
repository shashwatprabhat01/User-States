This text presents the outline/methodology to use the different files.

1. The first file is populate.js. It converts the userStates.csv file to a json file named "output_userStates.json".
The output json file is included in the repository as well.

2. The second file is parse.js. It is used to parse the json data and insert it into mongodb.
So, first we run "node populate.js". Then we run "node parse.js".

3. Once, this has been done, we start querying in the mongodb. To do that we have written node.js scripts.

4. We count the distinct "user states" present in the collection and list them.To do this, we have the countuserstates.js file.
The file counts different user states for us and also returns the list of all user states. Run "node countuserstates.js".

5. We then count the number of people using different operating systems like Android, Windows, iOS, etc. We do this by querying on the "osType" field present in the documents inside the collection. We can see the number as well as the percentage of people using each operating system. The file for this is "countOS.js". Run "node countOS.js".

6. We then count the number of people coming through different influencer campaigns and their respective percentages. We also count the number of people who are not coming from any of the campaigns. The output has been arranged in the ascending order of percentages. The file for this is "countcampaign.js". Run "node countcampaign.js".