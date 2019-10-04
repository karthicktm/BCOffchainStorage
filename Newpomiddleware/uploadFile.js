const express = require('express')
const fileUpload = require('express-fileupload')
const mongodb = require('mongodb')
const fs = require('fs')
const app = express()
const router = express.Router()
const mongoClient = mongodb.MongoClient


const smartcontract = require('./middleware/smartcontract');
app.use(fileUpload());

router.get("/", (req, res) => {
    res.sendFile('./index.html', { root: __dirname })
})

router.post("/upload", (req, res) => {
    var pOrderNumber = req.body.pOrderNumber;
    var status = req.body.status;
    var rate = req.body.rate;
    var owner= req.body.owner;
    var quantity = req.body.quantity;
    var hash = req.files.uploadedFile.md5;
    var name = req.files.uploadedFile.name; 
    let file = { Name : name, Hash: hash, File : req.files.uploadedFile.data }
    
    mongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
        if (err) {
            return err
        }
        else {
            let db = client.db('uploadDB')
            let collection = db.collection('files')
            try {
                collection.insertOne(file)
                console.log('File Inserted');
            }
            catch (err) {
                console.log('Error while inserting:', err)
            }
            client.close()
            res.redirect('/')
        }
    })

    console.log(pOrderNumber);
    console.log(status);
    console.log(rate);
    console.log(owner);
    console.log(quantity);
    console.log(name);
    console.log(hash);

  smartcontract.createPorder(pOrderNumber,status,rate,owner,quantity,name.toString(),hash.toString()).then((result) => {        
        console.log("Data Inserted to Ledger");
     });
})


app.use("/", router)
app.listen(3000, () => console.log('Started on 3000 port'))