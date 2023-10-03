const express = require("express");
const router = express.Router()
const controllerfn = require('../controllers/course');

router.post("/register/:role",controllerfn.createCourse);
router.get("/get-course/:role", controllerfn.getCourse);
router.get("/get-Allcourse", controllerfn.getAllCourse);
router.delete("/drop-course/:role", controllerfn.dropCourse);

module.exports = router;