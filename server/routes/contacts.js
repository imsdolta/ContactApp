// This is place for all routes such as Add, delete, edit and so on...
const { check, validationResult } = require('express-validator')
const express = require('express');
const router = express.Router();
const contacts = require('../Models/Phone')


// Add users to DB    /contacts
router.post('/',
  [
    check('Name').isLength({ min: 2 }).isLength({ max :20}),
    check('number').isLength({ max: 10 }).isNumeric(),
    check('Email').isEmail(),
    check('Catagory'),
    check('URL')
  ],
  (req, res, next)=> { 
  
    console.log(req);
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
          if(err) next(err);
          else{
            res.status(200);
          }
      });
    
  
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
    return res.status(422).json({  errors: extractedErrors, })
    }
});



//  /contacts/p route
router.get('/',function(req, res, next) {
  contacts.find({}, function(err, contact) {
      if(err) next(err);
      console.log(contact);
      res.json({
        contact
      })
  });
});

router.get('/:id',function(req, res, next) {
 
  const _id = {_id : req.params.id};   // must be an object while using find

  contacts.find(_id, (err, contact)=> {
      if(err) {
        next(err);
      } else {
          res.json({
          contact
        })
      }
      
  });
});

//  /contacts/delete/:id route
router.get('/delete/:id', (req, res, next)=> {

  const id = {_id : req.params.id};
  
  contacts.deleteOne(id, (err)=> {
  if (err) {
      next(err);
  } else {  
   res.json({ message :"Contact Deleted"});
  }
});
});
 
 

//  /contacts/edit/:id route
router.get('/edit/:id', (req, res, next) => {
  let id = {_id : req.params.id};
  contacts.findById(id, (err, contact)=> {
    console.log(contact);
    if(err) {
      res.json({"error":"not found"});
        next(err);
    } else {
      contacts.deleteOne(id, (err)=> {
        if (err) {
            next(err);
        } else {  
            res.json(contact);
        }
      });
    }
  });
});


//handle error
router.use((err, req, res, next)=> {
  res.status(err.status|| 500).send(
  {
      "error name":err.name,
      "Message":err.message
  }
    );
})


module.exports = router;