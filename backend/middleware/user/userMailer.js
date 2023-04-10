const HttpError = require('../../models/httpError');
const { testSendMail } = require('../mailer');
require('dotenv').config({ path: './local.env' });

const userSendActivation = async(activationLink, email) => {

   const mailInfo = {
        from: process.env.MAILER_SERVER,
        to: email,
        subject: 'Account Activation for Cong Welding',
        text: `Thank you for signing up! You can activate your account by clicking on the link below.\n\n${activationLink}`,
        html: `<p>Thank you for signing up! You can activate your account by clicking on the link below.</p><br><br><a href="${activationLink}">${activationLink}</a>`
   }

   console.log(mailInfo);


   let previewUrl;

   try {
        previewUrl = await testSendMail(mailInfo);
    } catch (err) {
        const error = new HttpError('Something went wrong, could not send activation email.', 500);
        return next(error);
    }

    return previewUrl;
}

module.exports = {
    userSendActivation
};