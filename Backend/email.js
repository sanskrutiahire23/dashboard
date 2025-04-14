const nodemailer = require("nodemailer");
require("dotenv").config();

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL,  
        pass: process.env.GMAIL_PASSWORD  
    }
});

// Function to send an email
const sendEmail = async (toEmail, eventName, eventDate, eventTime) => {
    try {
        const mailOptions = {
            from: process.env.GMAIL,
            to: toEmail,
            subject: `New Session Added: ${eventName}`,
            html: `<h2>New Session Scheduled</h2>
                   <p><b>Event Name:</b> ${eventName}</p>
                   <p><b>Date:</b> ${eventDate}</p>
                   <p><b>Time:</b> ${eventTime}</p>
                   <p>Don't forget to join your session on time!</p>`
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent successfully to ${toEmail}`);
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
};


module.exports = sendEmail;
