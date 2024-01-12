const courseModel = require('../models/course');

// CREATE COURSE
async function createCourse(req, res) {
  try {
    const role = req.params.role;
    const result = await courseModel.createCourse(req.body, role);
    if (result) {
      res.status(200).json({ message: "Created successfully" });
    } else {
      res.status(400).json({message:"INVALID"}); 
    }
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// GET PARTICULAR COURSE
async function getCourse(req,res) {
  try {
    const role = req.params.role
    const result = await courseModel.getCourse(req.body, role);
    console.log(result)
    
    if (result) {
      res.status(200).json({ message: "Successful", data: result[0] });
    } else {
      res.status(400).json({message:"INVALID"}); 
    }
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// GET ALL COURSES
async function getAllCourse(req,res) {
  try {
    
    const result = await courseModel.getAllCourse();
    console.log(result)
    const data = result[0]

    
    if (result) {
      res.status(200).json({ message: "Successful", data: data });
    } else {
      res.status(400).json({message:"INVALID"}); 
    }
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// DROP A COURSE
async function dropCourse(req,res) {
  try {
    const role = req.params.role
    const result = await courseModel.dropCourse(req.body, role);
    console.log(result);
    if(!result){
      res.status(200).json({message:"Course has been dropped"})
    } else {
      res.status(400).json({message: `Error occurred while deleting`})
    }
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
}

module.exports = {
  createCourse,
  getAllCourse,
  getCourse,
  dropCourse
};
