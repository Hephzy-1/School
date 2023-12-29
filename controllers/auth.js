const { register, login, reset, resetLink } = require("../models/auth");
const { comparePassword } = require("../utils/hash")
const { generateToken } = require("../utils/jwt"); // JWT token

// REGISTER
async function registration(req,res){
  try{
    const result = await register(req.body)
    if (result) {
      return res.status(200).json({message:"Created succesfully"})
    } else {
      return res.status(400).json({message: `Error registering. User already exist`})
    }
  }
  catch(error){
    return res.status(500).json({ message: error.message })
  }
}

// LOGIN 
async function loginUser(req,res){
  try{
    const result = await login(req.body);

    const user = result[0][0]
    console.log(user);

    if (!user) {
      throw Error("This User doesn't exist");
    }

    const isMatch = await comparePassword(req.body.password, user.password);
    console.log(req.body.password);
    console.log(user.password);
    
    console.log(isMatch);
    

    if (!isMatch) {
      throw Error(`INVALID INFORMATION`);
    } else {

      const token = await generateToken(user);
      console.log(token);

      return res.cookie('token', token, {httpOnly: true, expires: new Date(Date.now() + 1000 * 60 * 60)}).status(202).json({message: `LOGIN SUCCESSFUL`, token: token})

    }
    
    // Catch and handle errors
  } catch(err){
    if (err == "This User doesn't exist") {
      res.status(404).json({message: `This User doesn't have a profile with us`});
    } else if (err === "INVALID INFORMATION") {
      res.status(401).json({message: `Invalid Password`})
    }else {
      res.status(500).json({ message: `INTERNAL SERVER ERROR`, error: err.message });
    }
    
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
async function resetPassword(req, res) {
  try {
    
    const result = await reset(req.body, req);

    if(result){
      return res.status(200).json({message:"PASSWORD UPDATE WAS SUCESSFUL"})
    }
    else{
      return res.status(400).json({message:"INVALID INFORMATION"})
    }
 }
  catch(err){
    return res.status(500).json({ message: err.message })
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