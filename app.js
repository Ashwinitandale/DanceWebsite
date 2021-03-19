const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const mongoose = require('mongoose');
const bodyparser =require("body-parser");
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 6060;




const contactSchema = new mongoose.Schema({
    name: String,
    phone:String,
    email: String,
    address: String,
    desc: String
  });
  var Contact = mongoose.model('contact', contactSchema);


//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) //for serving static file
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set('view engine', 'pug')//set the templet engineas pug
app.set('views', path.join(__dirname, 'views')); //set the view directory

//ENDPOINTS
app.get('/', (req, res) => {
    const con = "This is the best contenton the internet so far so use it wisely"
    const params = { }
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res) => {
    const con = "This is the best contenton the internet so far so use it wisely"
    const params = { }
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res) => {
  var myData=new Contact(req.body)
  myData.save().then(()=>{
      res.send("This item has been saved in database")
  }).catch(()=>{
      res.status(400).send("item was not saved to the database")
  })
})








//START THE SERVER
app.listen(port, () => {
    console.log(`The applicatin started successfully on port ${port}`);
});
