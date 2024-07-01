const mongoose = require('mongoose');

// mongoose.connect("mongodb+srv://devg05:GFRtxq5uLOq5MHvo@cluster0.zlv7qbe.mongodb.net/jeeranks")
// .then(()=>{
//     // console.log("Connected Succ to DB");
// })
// .catch((err)=>{
//     console.log(err);
// })

// Schema defines the structure of our document like which field is of which data type, we can add validators, etc.
const devSchema = new mongoose.Schema(
    {   
        Year: Number,
        Category: String,
        InsCode: String,
        BranchCode:  String,
        Rank: String
    },
    {
        collection: 'ranks',                                // Explicitly specify the collection name
        versionKey: false                                      // so as to remove  "__v"
    }
);

const rankData = mongoose.model('ranks', devSchema);       // frndData is just a variable to store the model created but treat it as out main collection
// In above line we can use any name for model_name as it won't be used till we explicitly define our db as collection:'devdata'
// Also if we don't explicitly define then the model_name will be automatically converted to lowercase plural form. Eg: DevData => devdatas
module.exports = rankData;