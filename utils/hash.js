const bcrypt = require("bcrypt");

// async function hashPassword(password) {
//   let genPassword = await bcrypt.genSalt(5);
//   return genPassword;
// }

// const hasher = (password, saltRounds, err, hash) => {
//   bcrypt.hash(password, saltRounds, function (err, hash) {});
// };

const hashPassword = async (password) => {
  return bcrypt.hash(password, 10)
}

const passwordMatches = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword)
}

module.exports = {
  hashPassword,
  passwordMatches
}
// let result = hashPassword("ADEJUMO");
// console.log(result);