const dB = require('../config/db'); // Import your existing database dB module

async function register(payload) {
  const { username, password, role} = payload;

  try {
    const query = `
        INSERT INTO ${role}s (Username, Password)
        VALUES(?, ?)
      `;
    if (role === "admin") {
      const values = [username, password];
      const result = (await dB).query(query,values)

      return result;
    } else if (role === "lecturer") {

      const values = [username, password];
      const result = (await dB).query(query,values)

      return result;
    } else if (role === "student") {

      const values = [username, password];
      const result =(await dB).query(query,values)

      return result;
    } else {
      throw Error("INVALID ROLE");
    }

  } catch (err) {
   throw Error(err.message);
  }
}

async function login(payload) {
  const { username, password, role } = payload;
   const query = `
        SELECT * FROM ${role}s
        WHERE username = ? AND password = ?
      `;

  try {
    if (role === "admin") {
      
      const values = [username, password];
      const result = (await dB).query(query, values);

      return result;
    } else if (role === "lecturer") {

      const values = [username, password];
      const result = await   (await dB).query(query, values);

      return result;
    } else if (role === "student") {

      const values = [username, password];
      const result = (await dB).query(query, values);

      return result;
    } else {
      throw Error("INVALID ROLE");
    }

  } catch (err) {
    return err.message;
  }
}

async function reset(payload) {
  const { username, password, role } = payload;
   const query = `
        UPDATE ${role}s
        SET password = ?
        WHERE username = ?
      `;
  try {
    if (role === "admin") {
      
      const values = [password, username];
      const result = (await dB).query(query, values);
      return result;

    } 
    else if (role === "lecturer") {

    const values = [ password, username];
    const result = (await dB).query(query, values);
    return result;
    } 
    else if (role === "student") {

    const values = [password, username];
    const result = (await dB).query(query, values);
    return result;
  } else {
    throw Error('Invalid role')
  }
    
  } catch (error) {
    throw error;
  }
}

const Payload = {
  username: "Hephzy1",
  password: "?iuwibjxkao;jm9e8ec7&2h",
  role: "admin",
};

module.exports = { register, login, reset };