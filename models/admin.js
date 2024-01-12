const dB = require('../config/db');

// GET PARTICULAR ADMIN
async function getAdmin(payload) {
  const {username, role} = payload;
  try {
    if (role === "admin") {
    const query = `
    SELECT id, username, registered_at
    FROM admins
    WHERE username = ?
    `;

    const values = [username];
    const result = (await dB).query(query, values);
    return result;
    } else {
      return 'Error'
    }
  } catch (error) {
    throw Error (error);
  }
}

// GET PARTICULAR STUDENT
async function getStudent(payload, role) {
  const {username} = payload;
  try {
    if (role === "admin") {
    const query = `
    SELECT id, username, registered_at FROM students
    WHERE username = ?
    `;

    const values = [username];
    const result = (await dB).query(query, values);
    return result;
    } else {
      return 'Error'
    }
  } catch (error) {
    throw Error (error);
  }
}

// GET PARTICULAR Lecturer
async function getLecturer(payload, role) {
  const {username} = payload;
  try {
    if (role === "admin") {
    const query = `
    SELECT id, username, registered_at 
    FROM lecturers
    WHERE username = ?
    `;

    const values = [username];
    const result = (await dB).query(query, values);
    return result;
    } else {
      return 'Error'
    }
  } catch (error) {
    throw Error (error);
  }
}

// DROP A STUDENT
async function dropStudent(payload, role) {
  const { username } = payload
  try {
    if (role === "admin") {
      const query = `
      DELETE FROM students
      WHERE username = ?
      `;

      const values = [username];
      const result = (await dB).query(query, values);
    } else {
      return `Invalid role`;
    }
  } catch (error) {
    throw Error(error)
  }
}

// GET ALL STUDENTS
async function getAllStudents() {
  
  try {
      const query = `
      SELECT * FROM students
      `;
      
      const result = (await dB).query(query)
      console.log(result)
      return result;
    
  } catch (error) {
    throw Error(error)
  }
}

module.exports = {
  getAdmin,
  getStudent,
  getLecturer,
  getAllStudents,
  dropStudent
}
