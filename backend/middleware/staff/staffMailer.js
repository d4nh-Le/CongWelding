const testSendMail = require('../mailer');
require('dotenv').config({ path: './local.env' });

const staffSendActivation = async(activationLink, email) => {

   const mailInfo = {
        from: process.env.MAILER_SERVER,
        to: email,
        subject: 'Staff Account Activation for Cong Welding',
        text: `Welcome to the team! You can activate your account by clicking on the link below.\n\n${activationLink}`,
        html: `<p>Welcome to the team! You can activate your account by clicking on the link below.</p><br><br><a href="${activationLink}">${activationLink}</a>`
   }

   try {
        await testSendMail(mailInfo);
    } catch (err) {
        const error = new HttpError('Something went wrong, could not send activation email.', 500);
        return next(error);
    }

    res.status(201).json({ message: "Sent activation mail successfully."});
}

module.exports = {
    staffSendActivation
};