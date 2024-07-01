const express = require('express');
const router = express.Router();
const frndData = require('../models/regUser');

// This link can be used to get all of our documents of db as no id/name/etc in link
router.get('/', async (req, res) => {          // must remember that we never use req.body in case of GET request because user never sends any data in GET request
    try {
        res.send('Hi Friends, When are you planning to meet now');   // we can have only one .send() request if multiple then error will come
        // const result = await frndData.find({ name: "Devyansh" });
        // res.status(201).send(result);
    }
    catch (err) { res.status(401).send(err); }

})

// This link can be used to get a particular document of db as id is in link
router.get('/friends/:id', async (req, res) => {         
    try {
        res.send('Hi Friends, When are you planning to meet now');
        console.log(req.params);            // req.params actually consist of what we have put after ':'. Eg.: friends/:id/books/:name => id:... , name:...
    }
    catch (err) { res.status(401).send(err); }

})

// router.post('/register', async (req, res) => {
//     try {
//         console.log(req.body);
//         const frnd = new frndData(req.body);
//         res.status(201).send("Hello Friends, This is Dev_g05 and your Data is Successfully Registered!!");
//         const result = await frnd.save();
//     }
//     catch (err) { res.status(401).send(err); }
// })

// PATCH req is to modify only a particular field while PUT is to modify whole document data
router.patch('/friends/:id', async (req, res) => {           // :id is just notation, address must be friends/id not friends/:id or friends:id
    try {
        const _id = req.params.id;
        const user = await frndData.findByIdAndUpdate(_id, {name:"Kartik"}, { new: true });
        // const user = await frndData.findByIdAndUpdate(_id, {req.body}, { new: true }); 
        // Here in req.body we can just send the field which we want to update in our document instead of complete document but if PATCH then whole data
        if (!user) {
            return res.status(404).send('User not found');
        }
        console.log(user);
        res.send("Updated Successfully");
    } catch (err) {
        res.status(401).send(err);
    }
});

router.delete('/friends/:id', async(req,res)=>{
    try{
        const _id = req.params.id;
        const delUser = await frndData.findByIdAndDelete(_id);
        if (!delUser) {
            return res.status(404).send('User not found');
        }
        console.log(delUser);
        res.send("Deleted Successfully");
    }
    catch(err){
        res.status(401).send(err);
    }
})

module.exports = router;