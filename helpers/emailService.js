
const nodemailer = require('nodemailer');

function sendEmail(to,subject,text) {
      // Create an email message
      let mailOptions = {
        from: process.env.SMTP_SENDER_EMAIL, // Sender address
        to: to, // List of recipients
        subject: subject, // Subject line
        html: text // Plain text body
    };

    // return new Promise(async (resolve, reject) => {
    //     try {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        },
      });
  

    // Send the email
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.error('Error occurred:', error);
            transporter.close();
            //return reject(error);
        } else {
            console.log('Email sent successfully!', info.response);
            transporter.close();
            //return resolve({ success: true});
        }
    });
// catch (error) {
//     console.error("ERROR!!! While Sending Email!!!", error);
//     return reject(error);
//   }
// })
}

module.exports = sendEmail;


//Example Usage
//const sendEmail = require('../helpers/emailService');
  // const to = pararms.email;
  //   const subject = 'FORGOT PASSWORD - OTP ';
  //   const html = forgotPasswordTemplate(otp);
  //   sendEmail(to, subject, text);



