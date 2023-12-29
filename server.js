const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const cors = require('cors');
const { config } = require("./config/env");
const { authUser } = require("./middlewares/auth");
const authRoute = require("./route/auth")
const adminRoute = require("./route/admin");
const studentRoute = require("./route/student");
const lecturerRoute = require("./route/lecturer");
const courseRoute = require("./route/course");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("Welcome to the School API", req.url);
})

app.use("/auth", authRoute)
app.use(authUser)
app.use("/admin", adminRoute);
app.use("/student", studentRoute);
app.use("/lecturer", lecturerRoute);
app.use("/courses", courseRoute);
app.use(errorHandler);

app.listen(3100, () => {
  console.log("Server running on port 3100");
});