const dB = require('../config/db'); // Import existing database dB module
const { hashPassword, comparePassword } = require("../utils/hash.js"); // Password hashing
const { generateToken } = require("../utils/jwt.js"); // JWT token
const send = require("../utils/mailSender.js"); // Send email
const { registerSchema, loginSchema } = require("../validation/authSchema.js")
const { config } = require("../config/env.js");

// Check If user exists
async function checkUser(username, role) {
  const query = `
    SELECT COUNT(*) as count
    FROM ${role}s
    WHERE username = ?
  `;
  const values = [username];
  const result = (await dB).query(query, values);
  return result;
}

// Register User
async function register(payload) {

  const { error, value } = registerSchema.validate(payload);

  if (error) {
    console.log(error.details, error.message)
    throw error
  }
  const { username, userPassword, role } = value;

  try {
    
    const userExists = await checkUser(username, role);
    if (userExists) {
      console.log("I exist");
      return false;
    } else {

      const hashedPassword = await hashPassword(userPassword);
      const query = `
        INSERT INTO ${role}s (Username, Password)
        VALUES(?, ?)
      `;
      const values = [username, hashedPassword];
      const result = (await dB).query(query, values);
      console.log(result[0], result);
      const { password, ...userData } = result;
      console.log(userData)
      const response =  await send.registerEmail(email, config.SENDER_EMAIL)
      console.log(response);
      return userData;
    }

  } catch (err) {
   throw Error(err);
  }
  
}

// Login User
async function login(payload) {

  const { error, value } = loginSchema.validate(payload)
  if (error) {
   throw error
  }

  const { username, password, role } = value;


  try {
    const userExists = await checkUser(username, role);
    if (!userExists) {
      console.log("I don't exist");
      return false;
    }
   
    // const hashedPassword = await hashPassword(password);
    // console.log(hashedPassword)
    
    const query = `
            SELECT *
            FROM ${role}s
            WHERE username = ? 
            `;
    const values = [username];
    
    const result = (await dB).query(query, values);
    

    const user = result[0][0];
  

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return false;
    }

    const token = await generateToken(user);

    return token;

  
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
}

// Send reset link
const resetLink = async (payload) => {

  const { username, role} = payload;

  const userExists = await checkUser(username, role)

  if (!userExists) {
    return false;
  }

  try {

  const response =  await send.sendResetEmail(username, config.SENDER_EMAIL)
  return response
  
  } catch (error) {
    console.log(error)
    throw Error(error)
  }
}

// Reset password
async function reset(payload) {
  const { username, password, role } = payload;

  const hashedPassword = await hashPassword(password);
   const query = `
        UPDATE ${role}s
        SET password = ?
        WHERE username = ?
      `;
  try {
    if (role === "admin") {
      
      const values = [hashedPassword, username];
      const result = (await dB).query(query, values);
      const response =  await send.passwordResetEmail(email, config.SENDER_EMAIL)
      console.log(response);

      return result;

    } 
    else if (role === "lecturer") {

    const values = [hashedPassword, username];
    const result = (await dB).query(query, values);
    const response =  await send.passwordResetEmail(email, config.SENDER_EMAIL)
      console.log(response);
    return result;
    } 
    else if (role === "student") {

    const values = [hashedPassword, username];
    const result = (await dB).query(query, values);
    const response =  await send.passwordResetEmail(email, config.SENDER_EMAIL)
      console.log(response);
    return result;
  } else {
    throw Error('Invalid role')
  }
    
  } catch (error) {
    throw error;
  }
}

module.exports = { 
  register, 
  login,
  reset, 
  checkUser,
  resetLink
};

// const Payload = {
//   username: "Hephzy1",
//   password: "?iuwibjxkao;jm9e8ec7&2h",
//   role: "admin",
// };