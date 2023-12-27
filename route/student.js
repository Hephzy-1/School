const express = require("express");
const studentRouter = express.Router()
const { enrollCourse, studentsAcrossCourse, getTheCoursesEnrolled, dropACourse } = require("../controllers/student")

studentRouter.post("/enroll/:role", enrollCourse);
studentRouter.get("/across-course/:role", studentsAcrossCourse);
studentRouter.get("/enrolled-course/:role", getTheCoursesEnrolled);
studentRouter.delete("/drop-enrolled-course/:role", dropACourse);


module.exports = studentRouter;