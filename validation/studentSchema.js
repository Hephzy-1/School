const Joi = require("joi");

const enrollCourse = Joi.object({
  course_code: Joi.string().required(),
  student_username: Joi.string().required(),
  role: Joi.string().valid("student").required()
    
});

module.exports = {
  enrollCourse
}