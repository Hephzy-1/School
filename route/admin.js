const express = require("express");
const router = express.Router()
const registerfn = require("../controllers/admin");

router.post("/register",registerfn.registerAdmin);
router.post("/login",registerfn.loginAdmin);
router.put("/reset",registerfn.resetAdmin);
router.get("/get-admin",registerfn.getAdmin);
router.get("/get-student/:role",registerfn.getStudent);
router.get("/getallstudent/:role",registerfn.getAllStudents);
router.delete("/delete-student/:role",registerfn.dropStudent);

module.exports = router;