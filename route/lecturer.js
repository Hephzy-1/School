const express = require("express");
const lecturerRouter = express.Router()
const { getLecturer, getStudent, dropStudent } = require("../controllers/lecturer")

lecturerRouter.get("/get-student/:role", getStudent)
lecturerRouter.get("/get-lecturer/:role", getLecturer)
lecturerRouter.delete("/drop-student/:role", dropStudent)


module.exports = lecturerRouter;