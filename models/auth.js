const dB = require('../config/db'); // Import your existing database dB module

async function checkUser(username, role) {
  const query = `
    SELECT COUNT(*) as count
    FROM ${role}
    WHERE username = ?
  `;
  const values = [username];
  const result = (await dB).query(query, values);
  return result.count;
}

async function register(payload) {
  const { username, password, role} = payload;

  try {
    const hashedPassword = await hashPassword(password);
    const query = `
        INSERT INTO ${role}s (Username, Password)
        VALUES(?, ?)
      `;
    if (role === "admin") {
      const values = [username, hashedPassword];
      const result = (await dB).query(query,values)

      return result;
    } else if (role === "lecturer") {

      const values = [username, hashedPassword];
      const result = (await dB).query(query,values)

      return result;
    } else if (role === "student") {

      const values = [username, hashedPassword];
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

  const hashedPassword = await hashPassword(password);
   const query = `
        SELECT * FROM ${role}s
        WHERE username = ? AND password = ?
      `;
  try {
    if (role === "admin") {
      
      const values = [username, hashedPassword];
      const result = (await dB).query(query, values);

      return result;
    } else if (role === "lecturer") {

      const values = [username, hashedPassword];
      const result = await   (await dB).query(query, values);

      return result;
    } else if (role === "student") {

      const values = [username, hashedPassword];
      const result = (await dB).query(query, values);

      return result;
    } else {
      throw Error("INVALID ROLE");
    }

  } catch (err) {
    return err.message;
  }
}

const resetLink = async (payload) => {
  const { username, role } = payload;

  const userExists = await checkUser(username, role)

  if (!userExists) {
    return false;
  }

  try {
    const response = await sendMail(username, config.SENDER_EMAIL)
  } catch (error) {
    throw Error (error.message)
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

const Payload = {
  username: "Hephzy1",
  password: "?iuwibjxkao;jm9e8ec7&2h",
  role: "admin",
};

module.exports = { 
  register, 
  login,
  reset, 
  checkUser,
  resetLink
};