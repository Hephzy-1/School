const dB = require('../config/db'); // Import existing database dB module
const { hashPassword } = require("../utils/hash.js"); // Password hashing
const send = require("../utils/mailSender.js"); // Send email
const { registerSchema, loginSchema, resetSchema, passwordSchema } = require("../validation/authSchema.js")
const { generateToken, verifyToken } = require("../utils/jwt.js")
const config = require("../config/env.js");

// Check If user exists
async function checkUser(username, role) {
  const query = `
    SELECT COUNT(*) 
    FROM ${role}s
    WHERE username = ?
  `;
  const values = [username];
  const result = (await dB).query(query, values);
  return result[0];
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
    
    // If user has created an account previously
    const userExists = await checkUser(username, role);
    console.log(userExists)
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
      const response =  await send.registerEmail(username, config.SENDER_EMAIL)
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
    console.log(error.details, error.message);
    throw Error(error)
  }

  const { username, password, role } = value; 

  try {
    // Check if user exists
    const userExists = await checkUser(username, role);
    if (!userExists) {
      throw new Error(`This User Doesn't Exist`);
    }

    // Get user from database
    const query = `
      SELECT *
      FROM ${role}s
      WHERE Username = ?
    `;

    const values = [username];
    const result = (await dB).query(query, values);

    return result;

  } catch (err) {
    throw Error(err);
  }
}

// Send reset link
const resetLink = async (payload) => {

  const { error, value } = resetSchema.validate(payload);

  if (error) {
    console.log(error.details, error.message);
    throw error
  }

  const { username, role} = value;

  const userExists = await checkUser(username, role)

  if (!userExists) {
    return false;
  }

  try {

  const token = await generateToken(username)
  console.log(token);

  const response =  await send.sendResetEmail(username, role, token, config.SENDER_EMAIL)
  return response
  
  } catch (error) {
    console.log(error)
    throw Error(error)
  }
}

// Reset password
async function reset(payload, req) {
  const decoded = await verifyToken(req.params.token);
  console.log(decoded);

  const { error, value } = passwordSchema.validate(payload);

  if (error) {
    console.log(error.details, error.message)
    throw error
  }

  const { username, password, confirmpassword, role } = value;

  try {
    if (!decoded) {
      throw Error('Invalid token')
    } 

    if (username === decoded) {
      if (password !== confirmpassword) {
        throw Error('Passwords have to match')
      }

      const query = `
        UPDATE ${role}s
        SET password = ?
        WHERE username = ?
      `;
        
      const hashedPassword = await hashPassword(password);
      console.log(hashedPassword);

      if (role === "admin") {
        
        const values = [ hashedPassword, username ];
        const response =  await send.passwordResetEmail(username, config.SENDER_EMAIL);
        const result = await (await dB).query(query, values, response);
      
        return result;
      } else if (role === "lecturer") {

        const values = [ hashedPassword, username ];
        const response =  await send.passwordResetEmail(username, config.SENDER_EMAIL);
        const result = await (await dB).query(query, values, response)

        return result;
      } else if (role === "student") {
        const values = [ hashedPassword, username ];
        const response =  await send.passwordResetEmail(username, config.SENDER_EMAIL);
        const result = await (await dB).query(query, values, response)

        return result;
      } else {
        throw Error('Invalid role')
      }
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