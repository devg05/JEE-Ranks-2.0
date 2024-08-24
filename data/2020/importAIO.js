const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Connection URL
const url = 'mongodb+srv://devg05:GFRtxq5uLOq5MHvo@cluster0.zlv7qbe.mongodb.net/';
const dbName = 'jeeranks';
const collectionName = 'ranks';

// Array of JSON file paths
const jsonFiles = [
    path.join(__dirname, 'GEN_f.json'),
    path.join(__dirname, 'GEN-EWS_f.json'),
    path.join(__dirname, 'OBC_f.json'),
    path.join(__dirname, 'SC_f.json'),
    path.join(__dirname, 'ST_f.json')
];

// Array of category names corresponding to each JSON file
const categoryNames = ['GEN','GEN-EWS','OBC','SC','ST'];

// Create a new MongoClient
const client = new MongoClient(url);

async function importData() {
    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log('Connected successfully to server');

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Iterate over each JSON file
        for (let i = 0; i < jsonFiles.length; i++) {
            const filePath = jsonFiles[i];
            const categoryName = categoryNames[i];

            // Read the JSON file
            const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            // Add category field to each object in jsonData
            const new_jsonData = jsonData.map(obj => ({ ...obj, Category: categoryName ,Year: 2020}));

            // Destructure to remove the "AdvRollNo" key
            const filteredData = new_jsonData.map(obj => {
                const { "AdvRollNo": _, ...rest } = obj; 
                return rest;
            });
            // const filteredData = new_jsonData.filter(obj => obj.category !== 'AdvRollNo');

            // Insert the JSON data into the collection
            const result = await collection.insertMany(filteredData);
            console.log(`${result.insertedCount} documents from ${path.basename(filePath)} were inserted`);

        }

    } catch (err) {
        console.error('Error importing data:', err);
    } finally {
        // Close the connection
        await client.close();
        console.log('Connection closed');
    }
}

importData();
