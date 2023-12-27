const Joi = require('joi')

const validateCreateCourse = Joi.object({
  code: Joi.string().required(),
  unit: Joi.string().required(),
  teacher_username: Joi.string().required(),
  role: Joi.string().valid('admin').required()
})

module.exports = {
  validateCreateCourse
}