// This is place for all routes such as Add, delete, edit and so on...
// const { userValidationRules, validate } = require('../validators/validator.js')  
const { check, validationResult } = require('express-validator')

const express = require('express');
const router = express.Router();
const contacts = require('../Models/Phone')

// /contacts route
router.get('/', (req, res)=>{
  res.json({
    message:"This is contacts route"
  })
});


// Add users to DB
router.post('/Add',
  [
    check('Name').isLength({ min: 2 }).isLength({ max :20}),
    check('number').isLength({ max: 10 }).isNumeric(),
    check('Email').isEmail(),
    check('Catagory'),
    check('URL')
  ],
  (req, res, next)=> { 
  
    console.log(req.body);
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      let contact = new contacts({
          Name :req.body.Name,
          number : req.body.number,
          Email:req.body.Email,
          Catagory:req.body.Catagory,
          URL:req.body.URL
      });
  
      console.log('before saving ',contact);

      contact.save((err)=>{
          if(err) next();
          else{
            res.status(200);
          }
      });
    
  
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  return res.status(422).json({  errors: extractedErrors, })
    }
});



//  /contacts/find route
router.get('/find',function(req, res) {
  contacts.find({}, function(err, contact) {
      if(err) return handleError(err);
      console.log(contact);
      res.json({
        contact
      })
  });
});

router.get('/find/:id',function(req, res) {
 
  const _id = {_id : req.params.id};   // must be an object while using find
  contacts.find(_id, (err, contact)=> {
      if(err) return handleError(err);
      res.json({
        contact
      })
  });
});

//  /contacts/delete/:id route
router.get('/delete/:id', (req, res)=> {
  const id = {_id : req.params.id};
  contacts.deleteOne(id, (err)=> {
  if (err) {
      return handleError(err);
  } else {  
   res.json({ message :"Contact Deleted"});
  }
});
});
 
 

//  /contacts/edit/:id route
router.get('/edit/:id', (req, res) => {
  let id = {_id : req.params.id};
  contacts.findById(id, (err, contact)=> {
    console.log(contact);
    if(err) {
      res.json({"error":"not found"});
      handleError(err);
    } else {
      contacts.deleteOne(id, (err)=> {
        if (err) {
            return handleError(err);
        } else {  
            res.json(contact);
        }
      });
    }
  });
});


//handle error
const handleError = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500).send('error', error);
}


module.exports = router;