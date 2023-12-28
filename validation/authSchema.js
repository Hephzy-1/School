const Joi = require("joi")

const registerSchema = Joi.object({
  username: Joi.string().email().required(),
  userPassword: Joi.string().min(6).required(),
  role: Joi.string().valid('student', 'admin', 'lecturer').required()

})

const loginSchema = Joi.object({
  username: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('student', 'admin', 'lecturer').required() 
})

const resetSchema = Joi.object({
  username: Joi.string().email().required(),
  role: Joi.string().valid('student', 'admin', 'lecturer').required() 
})

const passwordSchema = Joi.object({
  username: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmpassword: Joi.string().min(6).required(),
  role: Joi.string().valid('student', 'admin', 'lecturer').required() 
})
module.exports = {
  registerSchema,
  loginSchema,
  passwordSchema,
  resetSchema
}