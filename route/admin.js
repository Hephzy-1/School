const express = require("express");
const adminRouter = express.Router()
const registerfn = require("../controllers/admin");

adminRouter.post("/register",registerfn.registerAdmin);
adminRouter.post("/login",registerfn.loginAdmin);
adminRouter.put("/reset",registerfn.resetAdmin);
adminRouter.post("/reset-link",registerfn.resetLink);
adminRouter.get("/get-admin",registerfn.getAdmin);
adminRouter.get("/get-student/:role",registerfn.getStudent);
adminRouter.get("/getallstudent/:role",registerfn.getAllStudents);
adminRouter.delete("/delete-student/:role",registerfn.dropStudent);

module.exports = adminRouter;