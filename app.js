const express = require("express");
const path = require("path");
// const fs = require("fs");
const app = express();
var mongoose= require("mongoose");
const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost/contactDance',{useNewUrlParser:true});
const port=8000;

//Define mongoose schema
var contactSchema =new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    address:String,
    desc:String
});
var contact = mongoose.model('Contact',contactSchema);
// Express specific stuff
// app.use(express.static('static',options))
app.use('/static',express.static('static')) //for serving static files
app.use(express.urlencoded())

//PUG specific stuff
app.set('view engine','pug')  //set the template engine as pug
app.set('views',path.join(__dirname,'views') )//Set the views directory)

//Endpoints
app.get('/',(req, res)=>{
    const params = { }
    res.status(200).render('home.pug',params);

})
app.get('/contact',(req,res)=>{
    const params = { }
    res.status(200).render('contact.pug',params);
})
app.post('/contact',(req,res)=>{
    var myData  = new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });

    // res.status(200).render('contact.pug');
})

//Start the server
app.listen(port,()=>{
    console.log(`This is application is started successfully on port ${port}`)
});
