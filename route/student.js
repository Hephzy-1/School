const express = require("express");
const studentRouter = express.Router()
const studentfn = require("../controllers/student")

studentRouter.post("/register",studentfn.registerStudent);
studentRouter.post("/login",studentfn.loginStudent);
studentRouter.put("/reset",studentfn.resetStudent);
studentRouter.post("/enroll/:role",studentfn.enrollCourse);
studentRouter.get("/across-course/:role",studentfn.studentsAcrossCourse);
studentRouter.get("/enrolled-course/:role",studentfn.getTheCoursesEnrolled);
studentRouter.delete("/drop-enrolled-course/:role",studentfn.dropACourse);


module.exports = studentRouter;