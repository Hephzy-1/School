const express = require("express");
const bodyParser = require("body-parser");
const { config } = require("./config/env");
const { authUser } = require("./middlewares/auth");
const adminRoute = require("./route/admin");
const studentRoute = require("./route/student");
const lecturerRoute = require("./route/lecturer");
const courseRoute = require("./route/course");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to the School API", req.url);
})

app.use(authUser)
app.use("/admin", adminRoute);
app.use("/student", studentRoute);
app.use("/lecturer", lecturerRoute);
app.use("/course", courseRoute);
app.use(errorHandler);
// 

app.listen(3100, () => {
  console.log("Server running on port 3100");
});