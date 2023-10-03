const express = require("express");
const router = express.Router()
const registerfn = require("../controllers/lecturer")

router.post("/register",registerfn.registerLecturer);
router.post("/login",registerfn.loginLecturer);
router.put("/reset",registerfn.resetLecturer)
router.get("/get-student/:role",registerfn.getStudent)
router.get("/get-lecturer/:role",registerfn.getLecturer)
router.delete("/drop-student/:role",registerfn.dropStudent)


module.exports = router;