const mongoose = require('mongoose');

// Schema defines the structure of our document like which field is of which data type, we can add validators, etc.
const devSchema = new mongoose.Schema(
    {   
        ProgramName: String,
        ProgramCode: String
    },
    {
        collection: 'branch',                                // Explicitly specify the collection name
        versionKey: false                                      // so as to remove  "__v"
    }
);

const branchData = mongoose.model('branch', devSchema);       // frndData is just a variable to store the model created but treat it as out main collection
// In above line we can use any name for model_name as it won't be used till we explicitly define our db as collection:'devdata'
// Also if we don't explicitly define then the model_name will be automatically converted to lowercase plural form. Eg: DevData => devdatas
module.exports = branchData;
