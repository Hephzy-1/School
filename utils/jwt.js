const jwt = require("jsonwebtoken");

const secretKey = "nciojkcaa"
function generateToken(payload) {
  const generatedToken = jwt.sign(payload, secretKey, {noTimestamp: true})
  return generatedToken;
}

async function verifyToken(token) {
  try {
    let decoded = await jwt.verify(token, secretKey)
    return decoded;
  } catch (error) {
    throw Error('INVALID TOKEN')
  }
}

let token = generateToken({ name: "Hephzy",courses:["CSC312","CSC313","CSC301"]});

console.log(token);

async function main() {
    let payload = await verifyToken(token);
    console.log(payload);
}

main();