const authModel = require('../models/auth')
const dB = require('../config/db');

// GET STUDENTS IN A PARTICULAR COURSE
async function getStudent(payload, role) {
  try {
    const { course_code } = payload;
    if (role == "lecturer") {
      const query = `
        SELECT student
        FROM registeredcourses
        WHERE course_id = ?
        `;
      const values = [course_code];
      const result = (await dB).query(query, values);
      if (result) {
        return result;
      } else {
        console.log("No student with course found");
        return false;
      }
    } else {
      console.log("unauthorized");
      return "UNATHORIZED";
    }
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}

async function getLecturer(payload, role) {
  try {
    const { course_code } = payload;
    if (role == "lecturer") {
      const query = `
        SELECT lecturer_id
        FROM courses
        WHERE code = ?
        `;
      const values = [course_code];
      const result = (await dB).query(query, values);
      if (result) {
        return result;
      } else {
        console.log(`NO lecturer FOUND WITH ${course_code}`);
        return false;
      }
    } else {
      console.log("unauthorized");
      return "UNATHORIZED";
    }
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}

async function dropStudent(payload, role) {
  try {
    const { course_code, student } = payload;
    if (role == "lecturer") {
      const query = `
        DELETE FROM registeredcourses
        WHERE course_id = ? AND student = ?
        `;
      const values = [course_code, student];
      const result = (await dB).query(query, values);
      if (result) {
        console.log(result);
        return result;
      } else {
        console.log(`NO STUDENT FOUND WITH ${course_code}`);
        return false;
      }
    } else {
      console.log("unauthorized");
      return "UNATHORIZED";
    }
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}

module.exports = {
  getStudent,
  getLecturer,
  dropStudent
}