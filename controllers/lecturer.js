const authModel = require("../models/auth");
const lecturer = require('../models/lecturer')

// REGISTER AS LECTURER
async function registerLecturer(req,res){
  try{
      const result = await authModel.register(req.body)
      res.status(200).json({message:"Created succesfully"})
  }
  catch(error){
    res.status(500).json({ message: error.message })
  }
}

// LOGIN AS LECTURER
async function loginLecturer(req,res){
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

// RESET PASSWORD AS LECTURER
async function resetLecturer(req,res) {
  try {
    const result = await authModel.reset(req.body);
    if(result){
      res.status(200).json({message:"RESET PASSWORD SUCESSFULL"})
    }
    else{
      res.status(400).json({message:"INVALID INFORMATION"})
    }
 }
  catch(err){
    res.status(500).json({ message: err.message })
  }    
}

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
    res.status(500).json({ message: err.message})
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
    const role = req.arams.role
    const data = await lecturer.dropStudent(req.body, role);
    if (data) {
      res.status(200).json({ message: "STUDENT DELETED SUCCESSFULLY", data });
    } else {
      res.json(`No student with the course code found`);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


module.exports = {
  registerLecturer,
  loginLecturer,
  resetLecturer,
  getLecturer,
  getStudent,
  dropStudent
};