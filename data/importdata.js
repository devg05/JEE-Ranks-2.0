const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Connection URL
const url = 'mongodb+srv://devg05:GFRtxq5uLOq5MHvo@cluster0.zlv7qbe.mongodb.net/';
const dbName = 'jeeranks';
const collectionName = 'branch';
// const collectionName = 'inscode';

// Read the JSON file
const dataPath = path.join(__dirname, 'coursecode.json');
// const dataPath = path.join(__dirname, 'iitcode.json');
const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));     // This variable contains the whole json data

// In case if we want to add a category to the json data
// const newCategory = 'yourNewCategory';
// jsonData = jsonData.map(obj => ({ ...obj, newCategory: 'yourValue' }));

// Create a new MongoClient
const client = new MongoClient(url);

async function importData() {
    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log('Connected successfully to server');

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Destructure to remove the "SL. No." key
        const filteredData = jsonData.map(obj => {
            const { "SL. No.": _, ...rest } = obj; 
            return rest;
        });
        // const filteredData = jsonData.filter(obj => obj.category !== 'SL. No.');
        
        // Insert the JSON data into the collection
        const result = await collection.insertMany(filteredData);
        console.log(`${result.insertedCount} documents were inserted`);

    } catch (err) {
        console.error('Error importing data:', err);
    } finally {
        // Close the connection
        await client.close();
        console.log('Connection closed');
    }
}

importData();
