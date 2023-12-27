const express = require("express");
const adminRouter = express.Router()
const { getAdmin, getAllStudents, getStudent, dropStudent } = require("../controllers/admin");

adminRouter.get("/get-admin", getAdmin);
adminRouter.get("/get-student/:role", getStudent);
adminRouter.get("/getallstudent/:role", getAllStudents);
adminRouter.delete("/delete-student/:role", dropStudent);

module.exports = adminRouter;