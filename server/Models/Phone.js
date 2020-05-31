let mongoose = require('mongoose');

// Phone Schema
let phoneSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  number: {
    type: Number
  },
  Catagory: {
    type: String
  },
  Email: {
    type: String
  }
});

let  contacts= (module.exports = mongoose.model('Model', phoneSchema, 'contacts'));
