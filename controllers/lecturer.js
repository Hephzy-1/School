const authModel = require("../models/auth");
const lecturer = require('../models/lecturer')

// GET A LECTURER IN PARTICULAR COURSE
async function getLecturer(req,res) {
  try {
    const role = req.params.role
    const result = await lecturer.getLecturer(req.body, role);
    if(result){
      res.status(200).json({message: "HERE ARE THE LECTURERS TEACHING THIS COURSE",data : result[0]})
    }
    else{
      res.status(400).json({message:"INVALID INFORMATION"})
    }
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
}

// GET STUDENT OFFERING A COURSE AS A LECTURER
async function getStudent(req,res) {
  try {
    const role = req.params.role
    const result = await lecturer.getStudent(req.body, role);
    console.log(result);
    if(result){
      res.status(200).json({message: "HERE ARE THE STUDENTS OFFERING THE COURSE", data : result[0]})
    }
    else{
      res.status(400).json({message:"INVALID INFORMATION"})
    }
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
}

// DROP A STUDENT FROM A COURSE
async function dropStudent(req, res) {
  try {
    const role = req.params.role
    const data = await lecturer.dropStudent(req.body, role);
    if (data) {
      res.status(200).json({ message: "STUDENT DELETED SUCCESSFULLY"});
    } else {
      res.json(`No student with the course code found`);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


module.exports = {
  getLecturer,
  getStudent,
  dropStudent
};