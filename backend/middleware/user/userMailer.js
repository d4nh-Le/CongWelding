const nodemailer = require("nodemailer");
const aws = require("@aws-sdk/client-ses");
require('dotenv').config({ path: './local.env' });

const sendActivation = async(activationLink, userEmail) => {

    const ses = new aws.SES({
    apiVersion: "2010-12-01",
    region: "ca-central-1",
    credentials: {
        accessKeyId: process.env.MAILER_ID,
        secretAccessKey: process.env.MAILER_SECRET
    },
    });

    // create Nodemailer SES transporter
    const transporter = nodemailer.createTransport({
        SES: { ses, aws },
        sendingRate: 1 // max messages/second
    });

    console.log(userEmail);

    // send some mail
    transporter.sendMail({
        from: process.env.MAILER_SERVER,
        to: userEmail,
        subject: "Message",
        text: "I hope this message gets sent!" + activationLink
    });
}



module.exports = {
    sendActivation
  };