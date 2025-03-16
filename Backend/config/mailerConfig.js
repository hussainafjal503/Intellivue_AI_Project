const nodemailer = require("nodemailer");

const config = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: "josefcartous1212@gmail.com",
    pass: "phlsgxwzatkhpjoy",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendMail = async (email, subj, data) => {
  const options = {
    from: "josefcartous1212@gmail.com",
    to: email,
    subject: subj,
    html: data,
  };
  config
    .sendMail(options)
    .then(() => {
     return true;
    })
    .catch((errr) => {
      console.log("error while sending mail..: ", errr);
		return false;
    });
};

module.exports = sendMail;
