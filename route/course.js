const express = require("express");
const courseRouter = express.Router()
const controllerfn = require('../controllers/course');

courseRouter.post("/register/:role",controllerfn.createCourse);
courseRouter.get("/get-course/:role", controllerfn.getCourse);
courseRouter.get("/get-Allcourse", controllerfn.getAllCourse);
courseRouter.delete("/drop-course/:role", controllerfn.dropCourse);

module.exports = courseRouter;