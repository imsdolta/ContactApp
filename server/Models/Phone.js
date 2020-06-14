let mongoose = require('mongoose');

// Phone Schema
let phoneSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  Catagory: {
    type: String
  },
  Email: {
    type: String
  },
  URL: {
     type: String,
  }
});

phoneSchema.path('URL').validate((val) => {
  urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return urlRegex.test(val);
}, 'Invalid URL.');

let  contacts= (module.exports = mongoose.model('Model', phoneSchema, 'contacts'));
