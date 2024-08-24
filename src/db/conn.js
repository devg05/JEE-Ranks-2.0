const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://user:pcrcYAbxsCwwoAus@cluster0.zlv7qbe.mongodb.net/jeeranks")
.then(()=>{
    console.log("Connected Succ to DB");
})
.catch((err)=>{
    console.log("err");
})