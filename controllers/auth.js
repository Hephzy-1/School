const { register, login, reset, resetLink } = require("../models/auth");

// REGISTER
async function registration(req,res){
  try{
      const result = await register(req.body)
      if (result) {
        res.status(200).json({message:"Created succesfully"})
      } else {
        res.status(400).json({message: `Error registering`})
      }
  }
  catch(error){
    res.status(500).json({ message: error.message })
  }
}

// LOGIN 
async function loginUser(req,res){
  try{
    const result = await login(req.body);
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

// RESET LINK
async function sendResetLink(req, res, next) {
  try {
    const data = await resetLink(req.body);

    if (data === false) {

      res.json({ message: "INVALID USERNAME " }); 

    } else {
      res.json({ 
        message: "PASSWORD RESET LINK SENT", 
        response: data 
      });
    }
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error)
  }
}

// RESET PASSWORD
async function resetPassword(req,res) {
  try {
    const result = await reset(req.body);
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

// LOGOUT
async function logout(req, res) {
  try {
    res.clearCookie("token");
    res.json({ message: "LOGOUT SUCCESSFUL" });
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

module.exports = {
  registration,
  loginUser,
  resetPassword,
  sendResetLink,
  logout
}