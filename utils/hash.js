const bcrypt = require("bcrypt");

// async function hashPassword(password) {
//   let genPassword = await bcrypt.genSalt(5);
//   return genPassword;
// }

// const hasher = (password, saltRounds, err, hash) => {
//   bcrypt.hash(password, saltRounds, function (err, hash) {});
// };

// const hashPassword = async (password) => {
//   return bcrypt.hash(password, 10)
// }

// const passwordMatches = async (password, userPassword) => {
//   return await bcrypt.compare(password, userPassword)
// }

// module.exports = {
//   hashPassword,
//   passwordMatches
// }

// ALSO HASHS PASSWORD 
function hashPassword(password) {
  return bcrypt.hashSync(password, 10)
}

// let hashed = hashPassword("Password")
// console.log(hashed);

// function comparePassword(password, userPassword){
//   return await bcrypt.compareSync(password, userPassword)
// }

const comparePassword = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword)
}

module.exports = {
  hashPassword,
  comparePassword
}

// console.log(comparePassword("Password", hashed));

// let result = hashPassword("ADEJUMO");
// console.log(result);