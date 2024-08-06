const nodemailer = require("nodemailer");

const sendMail = async (email) => {

    try {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gamil.com',
        port: 587,
        secure: false,
        auth: {
            user: 'ranurag404@gmail.com',
            pass: 'bhuspdayjxgxbyag'
        },
    });
    

    let info = await transporter.sendMail({
        from: {
            name : "Mangoesorange",
            address : 'gus.wiegand40@ethereal.email',
        },
        to: [`${email}`], // list of receivers
        subject: "verify email OTP password ✔", 
        text: "Hello my world Anurag", 
        html: `Your Email OTP ${Math.random()}`,
    });

  console.log("Message sent: %s", info.messageId);
} catch (error) {
    console.log(error,"ERRR");
}
}

module.exports = sendMail;