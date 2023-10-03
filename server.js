const express = require("express");
const server = express();

server.use(express.json());

const adminRoute = require("./route/admin");
const studentRoute = require("./route/student");
const lecturerRoute = require("./route/lecturer");
const courseRoute = require('./route/course')

server.use("/admin",adminRoute);
server.use("/student", studentRoute);
server.use("/lecturer", lecturerRoute);
server.use('/course', courseRoute)


server.use((error, req, res, next) => {
  res.json('URL NOT FOUND')
})
server.listen(3000,()=>{
  console.log("server running on port 3000")
})