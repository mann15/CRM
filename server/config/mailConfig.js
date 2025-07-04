
import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER, 
    pass: process.env.MAIL_PASS,
  },
});


const sendEmail = async (to, subject, text, html) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to, 
    subject, 
    text,
    html,
  };


  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return "Email sent successfully";
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};


sendEmail(
  "test@example.com",
  "Test Subject",
  "Test email body",
  "<p>Test email body in HTML</p>"
)
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

module.exports = {
  sendEmail,
};
