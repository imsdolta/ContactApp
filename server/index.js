const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const path = require('path');
const contacts = require('./Models/Phone');
require('dotenv').config();
const app = express();
const port = 3030



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors());


let contact = require('./routes/contacts');

const dbname = process.env.dbname;
const dbpwd = process.env.dbpwd;

const uri = 'mongodb+srv://'+ dbname +':' + dbpwd + '@cluser0-rlfqv.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(uri,
  {useNewUrlParser: true,
    useCreateIndex: true,
     useUnifiedTopology: true
   })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

let db = mongoose.connection;

// connect to MongoDB
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// check for MongoDB connection error
db.on('error', function(err) {
  console.log(err);

});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


// Express Session Middleware
app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  })
);  

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function(req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});


app.get('/*', function(req, res, next) {
  setTimeout(function() {
    req.session.flash = [];
  }, 3000);
  next();
});

app.get('/',(req, res)=>{
  res.json({
    message:"At home route"
  })
})


app.use('/contacts/',contact)
app.listen(port);


module.exports = app
