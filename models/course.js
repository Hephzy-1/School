const dB = require('../config/db')

// CREATE COURSES
async function createCourse(payload, role) {
  const {code, unit, lecturer} = payload
  try {
    if (role === "admin") {
      const query = `
      INSERT INTO courses (code, unit, lecturers_id)
      VALUES (?, ?, ?)
      `;
      const values = [code, unit, lecturer]
      const result = (await dB).query(query, values)
      return result;
    }
    else {
      console.log("unauthorized");
      throw Error('Only admins can register courses')
    }
  } catch (error) {
    throw Error(error.message)
  }
}

// GET A PARTICULAR COURSE
async function getCourse(payload, role) {
  const { code } = payload;
  try {
    if (role === "admin") {
      const query = `
      SELECT * FROM courses
      WHERE code = ? 
      `;

      const values = [code]
      const result = (await dB).query(query, values)
      console.log(result)
      return result;
    } else {
      Error(`You can't access this`)
    }
    
  } catch (error) {
    throw Error(error.message)
  }
}

// GET ALL COURSES
async function getAllCourse() {
  try {
      const query = `
      SELECT * FROM courses
      `;
      
      const result = (await dB).query(query)
      console.log(result)
      return result;
    
  } catch (error) {
    throw Error(error.message)
  }
}

// DROP A COURSE
async function dropCourse(payload, role) {
  const { code } = payload
  try {
    if (role === "admin") {
      const query = `
      DELETE FROM courses
      WHERE code = ?
      `;

      const values = [code];
      const result = (await dB).query(query, values);
      return result;
    } else {
      return `Invalid role`;
    }
  } catch (error) {
    throw Error(error)
  }
}

module.exports = {
  createCourse,
  getCourse,
  getAllCourse,
  dropCourse
}