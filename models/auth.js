const dB = require('../config/db'); // Import your existing database dB module
const { hashPassword, comparePassword } = require("../utils/hash.js");
const { generateToken } = require("../utils/jwt.js");
const { sendMail } = require("../utils/mailSender.js");
const { registerSchema, loginSchema } = require("../validation/authSchema.js")
const { config } = require("../config/env.js");

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
      return userData;
    }


  } catch (err) {
   throw Error(err);
  }
  
}

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

const resetLink = async (payload) => {

  const { username, role} = payload;

  const userExists = await checkUser(username, role)

  if (!userExists) {
    return false;
  }

  try {

  const response =  await sendMail(username, config.SENDER_EMAIL)
  return response
  
  } catch (error) {
    console.log(error)
    throw Error(error)
  }
}

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
      return result;

    } 
    else if (role === "lecturer") {

    const values = [hashedPassword, username];
    const result = (await dB).query(query, values);
    return result;
    } 
    else if (role === "student") {

    const values = [hashedPassword, username];
    const result = (await dB).query(query, values);
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