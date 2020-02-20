const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    service: 'Gmail',
    user: process.env.EMAIL_LOGIN,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const resetURL = (user, token) => `http://localhost:3000/api/resetPassword/${user._id}/${token}`;


const template = (user, url) => {
  const from = process.env.EMAIL_LOGIN;
  const to = user.email;
  const subject = 'Reset Password';
  const html = `
  <p> Hello ${user.email} </p>
  <p> You have requested a reset of your account password.</p>
  <p> Please use the following link to reset your password</p>
  <a href=${url}>${url}</a>
  <p> This link will expire within 1 hour </p>
`;

  return {from, to, subject, html};
};

module.exports = resetPasswordEmail = {
  transporter,
  resetURL,
  template
}