const authModel = require('../models/auth')
const dB = require('../config/db')

// ENROLL IN A COURSE
async function enroll(payload, role) {
  try {
    const { course_code, student } = payload;
    if (role == "student") {
      const query = `
          INSERT INTO registeredCourses(course_id, student)
          VALUES (?, ?)
          `;
      const values = [course_code, student];
      const result = (await dB).query(query, values);
      if (result) {
        return result;
      } else {
        console.log(`No course with the code ${course_code} found`);
        return false;
      }
    } else {
      console.log("unauthorized");
      return "UNATHORIZED";
    }
  } catch (err) {
    throw Error (err.message);
  }
}

// GET STUDENTS IN ENROLLED COURSE
async function getAcrossCourse(payload, role) {
  try {
    const { course_code } = payload;
    if (role == "student") {
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
        console.log("students not found");
        throw "students not found";
      }
    } else {
      console.log("unauthorized");
      throw "UNATHORIZED";
    }
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}

// GET THE COURSES STUDENTS ENROLLED FOR 
async function getCoursesEnrolled(payload, role) {
  try {
    const { student } = payload;
    if (role == "student") {
      const query = `
          SELECT course_id
          FROM registeredcourses
          WHERE student = ?
          `;
      const values = [student];
      const result = (await dB).query(query, values);
      if (result) {
        return result;
      } else {
        console.log("NOT REGISTERED IN ANY COURSE");
        return "NOT REGISTERED IN ANY COURSE";
      }
    } else {
      console.log("unauthorized");
      return "UNATHORIZED";
    }
  } catch (err) {
    console.error(err.message);
    throw Error (err.message);
  }
}

async function dropCourse(payload, role) {
  try {
    const { course_code, student } = payload;
    if (role == "student") {
      const query = `
          DELETE FROM registeredcourses
          WHERE course_id = ? AND student = ?
          `;
      const values = [course_code, student];
      const result = (await dB).query(query, values);
      return result;
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
  enroll,
  getAcrossCourse,
  getCoursesEnrolled,
  dropCourse
}