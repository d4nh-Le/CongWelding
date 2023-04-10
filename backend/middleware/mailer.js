const nodemailer = require("nodemailer");
require('dotenv').config({ path: './local.env' });

const testSendMail = async(mailInfo) => {
     // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: mailInfo.from, // sender address
    to: mailInfo.to, // list of receivers
    subject: mailInfo.subject, // Subject line
    text: mailInfo.text, // plain text body
    html: mailInfo.html, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  const previewUrl = nodemailer.getTestMessageUrl(info);

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", previewUrl);
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// Code referenced from https://medium.com/@bluedesk09/sending-email-with-zoho-nodejs-nodemailer-62de7fffc8ac
const sendMail = async(mailInfo) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.zoho.vn",
        secure: true,
        port: 465,
        auth: {
            user: "senderemaildomainhere",
            pass: "passwordhere"
        }
    });

     // send mail with defined transport object
  let info = await transporter.sendMail({
    from: mailInfo.from, // sender address
    to: mailInfo.userEmail, // list of receivers
    subject: mailInfo.subject, // Subject line
    text: mailInfo.text, // plain text body
    html: mailInfo.html, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = {
    testSendMail // Change this to sendMail and delete test mail once we have a domain we can use on Zoho
  };