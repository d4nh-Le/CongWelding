const nodemailer = require("nodemailer");

const sendActivation = async(activationLink)  => {
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

    // Create unverified user
    

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Cong Welding" <CongWelding@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Account Activation for Cong Welding", // Subject line
        text: "Thanks for signing up! You can activate your account by clicking on this link.\n\n" + activationLink, // plain text body
        html: "<b>Not sure if I need this</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}