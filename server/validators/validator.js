const { check, validationResult } = require('express-validator');


function userValidationRules() {
  return [
    check('Name').isAlpha(),
    check('Number').isLength({ max: 10 }).isNumeric(),
    check('Email').isEmail(),
    check('Catagory').isLength({ min: 2 })
  ]
}

const validate = (req, res, next) => {
  
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()   
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  userValidationRules,
  validate,
}