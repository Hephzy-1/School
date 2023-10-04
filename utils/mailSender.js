const sgmail = require("@sendgrid/mail")
const { config } = require('../config/env')

const sendMail = async (userEmail, myEmail) => {
  const Api_Key = config.SENDGRID_APIKEY;

  sgmail.setApiKey(ApiKey);

  const message = {
    to: userEmail,
    from: myEmail,
    subject: "Reset Your Password",
    text: " This is the link to reset your password",
  };

  sgmail
    .send(message)
    .then((response) => console.log("email sent"))
    .catch((err) => console.log(err.response.body));
};