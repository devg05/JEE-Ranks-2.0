const express = require('express');
const db = require('./db/conn.js');
const path = require('path');

const insData = require('./models/inscode.js');
const branchData = require('./models/branchcode.js');
const rankData = require('./models/ranks.js');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded());

// Middleware to serve static files
app.use('/public', express.static(path.join(__dirname, '..', 'public')));
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/search',async(req,res)=>{
    try{
        const year = req.body.year;
        const rank = req.body.rank;
        const category = req.body.category;
        const result1 = await rankData.findOne({Year:year,Rank:rank,Category:category});
        if (!result1){
            res.json({  data:[]   }); // pass empty array don't do [{}]
        }
        else{
            const iit_code = result1.InsCode;
            const branch_code = result1.BranchCode;

            const result2 = await insData.findOne({InstituteCode:iit_code});
            const result3 = await branchData.findOne({ProgramCode:branch_code});

            const iit_name = result2.InstituteName;
            const program_name = result3.ProgramName;
            if (!result3){
                res.json({ data:[] })
            }
            else if (branch_code[0]=="5"){
                data = [
                    {
                        iit_name: iit_name,
                        course_name: program_name,
                        course_time: "(5 Year)"
                    },
                ]
                res.status(200).json({data});
            }
            
            else if (branch_code[0]=="4"){
                data = [
                    {
                        iit_name: iit_name,
                        course_name: program_name,
                        course_time: "(4 Year)"
                    },
                ]
                res.status(200).json({data});
            }
        }
    }
    catch(err){
        console.log(err);
    }
})

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
