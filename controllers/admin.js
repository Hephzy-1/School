const adminModel = require('../models/admin')

async function getAdmin(req,res) {
  try {
    const result = await adminModel.getAdmin(req.body);
    console.log(result);
    if(result){
      res.status(200).json({message:"SUCESSFUL", data : result[0]})
    }
    else{
      res.status(400).json({message:"INVALID INFORMATION"})
    }
  } catch (error) {
    res.status(500).json({ message: err.message})
  }
}

async function getStudent(req,res) {
  try {
    const role = req.params.role
    const result = await adminModel.getStudent(req.body, role);
    console.log(result);
    if(result){
      res.status(200).json({message:"SUCESSFUL", data : result[0]})
    }
    else{
      res.status(400).json({message:"INVALID INFORMATION"})
    }
  } catch (error) {
    res.status(500).json({ message: err.message})
  }
}

async function dropStudent(req,res) {
  try {
    const role = req.params.role
    const result = await adminModel.dropStudent(req.body, role);
    console.log(result);
    if(!result){
      res.status(200).json({message:"Student has been dropped"})
    }
    else{
      res.status(400).json({message:"INVALID INFORMATION"})
    }
  } catch (error) {
    res.status(500).json({ message: err.message})
  }
}

async function getAllStudents(req,res) {
  try {
    
    const result = await adminModel.getAllStudents();
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

module.exports = {
  getAdmin,
  getStudent,
  getAllStudents,
  dropStudent
};