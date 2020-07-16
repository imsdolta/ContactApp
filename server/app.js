const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 1337


app.use(morgan('tiny'));
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


app.get('/',(req, res)=>{
  res.json({
    message:"At home route"
  })
})


app.use('/contacts',contact)
app.listen(port);


module.exports = app
