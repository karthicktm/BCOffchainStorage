const express = require('express')
const fileUpload = require('express-fileupload')
const mongodb = require('mongodb')
const fs = require('fs')
const app = express()
const router = express.Router()
const md5 = require('md5');
const mongoClient = mongodb.MongoClient;
const smartcontract = require('./middleware/smartcontract');
app.use(fileUpload());


router.get("/", (req, res) => {
    res.sendFile('./newindex.html', { root: __dirname })
})

var hash='';

router.post("/search", (req, res) => {
   
    var pOrderNumber = req.body.pOrderNumber;

    smartcontract.readPorder(pOrderNumber).then((result) => {         
         hash=result.hash;
         console.log("POrderNO: "+pOrderNumber);
         console.log("Hash from Ledger: "+hash);
    
        mongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
            if (err) {
                return err
            }
            else {
                let db = client.db('uploadDB')
                let collection = db.collection('files')
                try {                                        
                        collection.findOne({Hash : hash}, function(err, res) {
                         if (err) throw err;                           
                            console.log("Hash From MongoDB: "+res.Hash);
                            console.log("Contents of file:");                          
                            console.log(res.File.toString());
                        });
                }
                catch (err) {
                    console.log('Error while Searching:', err)
                }
                client.close()
                res.redirect('/')

            }

         })
    })
});

app.use("/", router)

app.listen(3000, () => console.log('Started on 3000 port'))