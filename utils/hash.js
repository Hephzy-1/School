const bcrypt = require('bcryptjs')
const secretKey = "$2a$05$hkY/WDW6eda0ovKlT3shRu"
// TO GENERATE SALT (salt is the number of rounds it takes to generate string) which forms our secret key
// function hashPassword(password) {
//   let genPassword = bcrypt.genSaltSync(5)
//   console.log(genPassword);
// }

// HASH PASSWORD (You can use either the try method or the callback method) /I need to learn the callback method of hashing/
// function hashPassword(password) {
//   try {
//     return bcrypt.hashSync(password, secretKey)
//   } catch (error) {
//     throw Error('Error occured while hashing')
//   }
// }

// // ALSO HASHS PASSWORD 
// // function hashPassword(password) {
// //   return bcrypt.hashSync(password, 5)
// // }

// let hashed = hashPassword("Password")
// console.log(hashed);

// function comparePassword(password, hash){
//   return bcrypt.compareSync(password, hash)
// }

// console.log(comparePassword("Password", hashed));


// SHORTER WAY TO COMPARE PASSWORD
let password = req.body

async function Hashing() {
  let hashed = await bcrypt.hash(password, secretKey)

  console.log(hashed)

  let checkIfPasswordIsValid = await bcrypt.compare(password, hashed);

  console.log("THE BOOLEAN RESULT", checkIfPasswordIsValid);
}

Hashing();