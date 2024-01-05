const express = require("express");
const adminRouter = express.Router()
const adminFn = require("../controllers/admin");

adminRouter.get("/get-admin", adminFn.getAdmin);
adminRouter.get("/get-student/:role", adminFn.getStudent);
adminRouter.get("/get-lecturer/:role", adminFn.getLec);
adminRouter.get("/getallstudent/:role", adminFn.getAllStudents);
adminRouter.delete("/delete-student/:role", adminFn.dropStudent);

module.exports = adminRouter;