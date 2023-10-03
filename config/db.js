const mysql = require('mysql2/promise');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'Backend',
  password:"Back-end.c0d1ng"
});

connection.then(()=>{
  console.log("SERVER RUNNING")
}).catch((error)=>{
  console.log("ERROR ON DATABASE")
})

module.exports = connection;
