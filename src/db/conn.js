const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://devg05:GFRtxq5uLOq5MHvo@cluster0.zlv7qbe.mongodb.net/jeeranks")
.then(()=>{
    console.log("Connected Succ to DB");
})
.catch((err)=>{
    console.log("err");
})