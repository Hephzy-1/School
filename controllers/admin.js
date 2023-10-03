const authModel = require("../models/auth");
const adminModel = require('../models/admin')

async function registerAdmin(req,res){
    try{
      const result = await authModel.register(req.body)
      console.log(result);
      if (result) {
          res.status(200).json({message:"Created succesfully"})
      } else {
        res.status(400).json({message : `Invalid Info`})
      }
    }
    catch(error){
      res.status(500).json({ message: error.message })
    }
}

async function loginAdmin(req,res){
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

async function resetAdmin(req,res) {
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
  registerAdmin,
  loginAdmin,
  resetAdmin,
  getAdmin,
  getStudent,
  getAllStudents,
  dropStudent
};