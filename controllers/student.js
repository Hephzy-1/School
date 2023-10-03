const authModel = require("../models/auth");
const student = require('../models/student')

// REGISTER AS STUDENT
async function registerStudent(req,res){
    try{
        const result = await authModel.register(req.body)
        res.status(200).json({message:"Created succesfully"})
    }
    catch(error){
      res.status(500).json({ message: error.message })
    }
}

// LOGIN AS STUDENT
async function loginStudent(req,res){
  try{
    const result = await authModel.login(req.body);
    console.log(result);
    if(result){
      return res.status(200).json({message:"LOGIN SUCESSFUL"})
    }
    else{
      return res.status(400).json({message:"INVALID INFORMATION"})
    }
  }
  catch(err){
    res.status(500).json({ message: err.message })
  }
}

// RESET PASSWORD
async function resetStudent(req,res) {
  try {
    const result = await authModel.reset(req.body);
    if(result){
      res.status(200).json({message:"RESET PASSWORD SUCESSFUL"})
    }
    else{
      res.status(400).json({message:"INVALID INFORMATION"})
    }
 }
  catch(err){
    res.status(500).json({ message: err.message })
  }    
}

// ENROLL IN A COURSE
async function enrollCourse(req, res) {
  try {
    const role = req.params.role
    const result = await student.enroll(req.body, role);
    if (result) {
      res.status(200).json({ message: "COURSE REGISTERED SUCCESSFULLY" });
    } else if (!result) {
      res.json(`No course with the code found`);
    } else {
      res.json("YOU ARE NOT ALLOWED TO CARRY OUT THIS ACTION");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// GET ALL THE STUDENTS ENROLLED IN A COURSE
async function studentsAcrossCourse(req, res) {
  try {
    const role = req.params.role
    const result = await student.getAcrossCourse(req.body, role);
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
    const result = await student.getCoursesEnrolled(req.body, role);
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
    const result = await student.dropCourse(req.body, role);
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
  registerStudent,
  loginStudent,
  resetStudent,
  enrollCourse,
  studentsAcrossCourse,
  getTheCoursesEnrolled,
  dropACourse
}