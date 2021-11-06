const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'gangof5.esprit2021@gmail.com',
        pass: 'esprit2021',
    },
});
module.exports = function sendEmail(to, subject, message) {
    const mailOptions = {
        from: 'gangof5.esprit2021@gmail.com',
        to,
        subject,
        html: message,
    };
    transport.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error);
        }
    });
};