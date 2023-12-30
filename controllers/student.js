const { enroll, getAcrossCourse, getCoursesEnrolled, dropCourse } = require('../models/student.js')

// ENROLL IN A COURSE
async function enrollCourse(req, res) {
  try {
    const role = req.params.role
    const result = await enroll(req.body, role);
    if (result) {
      res.status(200).json({ message: "COURSE REGISTERED SUCCESSFULLY" });
    } else {
      res.json(`No course with the code found`);
    }
  } catch (error) {
    if (error === "UNAUTHORISED") {
      res.json("YOU ARE NOT ALLOWED TO CARRY OUT THIS ACTION");
    } else {
      res.status(500).json({ message: error.message });
    }
  }
}

// GET ALL THE STUDENTS ENROLLED IN A COURSE
async function studentsAcrossCourse(req, res) {
  try {
    const role = req.params.role
    const result = await getAcrossCourse(req.body, role);
    if (result) {
      res.status(200).json({
        message: `HERE ARE THE STUDENTS OFFERING ${req.body.course_code}`, data: result[0]});
    } else {
      res.json("YOU ARE NOT ALLOWED TO CARRY OUT THIS ACTION");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// GET COURSES A PARTICULAR STUDENT ENROLLED FOR
async function getTheCoursesEnrolled(req, res) {
  try {
    const role = req.params.role;
    const result = await getCoursesEnrolled(req.body, role);
    if (result) {
      res.status(200).json({
        message: "HERE ARE YOUR REGISTERED COURSES", data: result[0]});
    } else {
      res.json("YOU ARE NOT ALLOWED TO CARRY OUT THIS ACTION");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// DROP ENROLLED COURSE AS STUDENT
async function dropACourse(req, res) {
  try {
    const role = req.params.role
    const result = await dropCourse(req.body, role);
    if (result) {
      res.status(200).json({ message: "COURSE DROPPED SUCCESSFULLY"});
    } else {
      res.json("YOU ARE NOT ALLOWED TO CARRY OUT THIS ACTION");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  enrollCourse,
  studentsAcrossCourse,
  getTheCoursesEnrolled,
  dropACourse
}