 console.log(req.params);
  let deletedstudent;

  if (req.params.role === "admin") {
    for (let i = 0; i < student.length; i++) {
      if (student[i].username == req.body.username) {
        deletedstudent = student.splice(i, 1)
      }    
    }
  } else {
    res.status(403).json('Only Admins can remove students')
  }

server.delete('/course/:role', (req, res) => {
  console.log(req.params);
  let deletedCourse;

  if (req.params.role === "admin") {
    for (let i = 0; i < course.length; i++) {
      if (course[i].code == req.body.code) {
        deletedCourse = course.splice(i, 1)
      }    
    }
    res.status(200).json('Course has been deleted successfully')
  }
  else {
    res.status(403).json('Only Admins can remove courses')
  }
  console.log(deletedCourse);
})

server.get('/student/:role', (req, res) => {
  console.log(req.params);
  if (req.params.role === "admin") {
    res.json(student)
  } else if (req.params.role === "teacher") {
    res.json(student)
  } 
  else {
    res.status(400).json("You don't have access")
  }
});

async function register(payload) {
    const {username, password, role} = payload
  try {
    if(role === "admin"){
      const query = `
        INSERT INTO admin (Username, Password & Role)
        VALUES(?, ?, ?)
      `
      
      const values = [username, password, role]
      const result = await (await dB).query(query, values)

      console.log(result);
    }
    
    else if (role === "teacher") {
      
    }
    else if (role === "student"){
      
    }
  } catch(err){

  }
}

verifyToken(token)
  .then((decoded) => {
    console.log(token); 
    console.log(decoded); 
  })
  .catch((error) => {
    console.error(error.message);
  });
