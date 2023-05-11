const nodeMailer=require("nodemailer")


exports.sendEmail=async (options)=>{
    var transporter = nodeMailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "c9e10ff7939af7",
          pass: "9b18eb60278ecf"
        }
      });
     
    const mailOptions={
        from:process.env.SMTP_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message
    }
    await transporter.sendMail(mailOptions)

}