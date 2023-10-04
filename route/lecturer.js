const express = require("express");
const lecturerRouter = express.Router()
const registerfn = require("../controllers/lecturer")

lecturerRouter.post("/register",registerfn.registerLecturer);
lecturerRouter.post("/login",registerfn.loginLecturer);
lecturerRouter.put("/reset",registerfn.resetLecturer)
lecturerRouter.get("/get-student/:role",registerfn.getStudent)
lecturerRouter.get("/get-lecturer/:role",registerfn.getLecturer)
lecturerRouter.delete("/drop-student/:role",registerfn.dropStudent)


module.exports = lecturerRouter;