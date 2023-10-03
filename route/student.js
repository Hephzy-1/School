const express = require("express");
const router = express.Router()
const studentfn = require("../controllers/student")

router.post("/register",studentfn.registerStudent);
router.post("/login",studentfn.loginStudent);
router.put("/reset",studentfn.resetStudent);
router.post("/enroll/:role",studentfn.enrollCourse);
router.get("/across-course/:role",studentfn.studentsAcrossCourse);
router.get("/enrolled-course/:role",studentfn.getTheCoursesEnrolled);
router.delete("/drop-enrolled-course/:role",studentfn.dropACourse);


module.exports = router;