import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === "true",

    auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_APP_PASSOWRD,
    },
});

export const sendWelcomeEmail = async (to) => {
    try {
        if (!to) {
            throw new Error("Email not get");
        }

        let subject = `Getting mail from node js `;
        let text = `Welcome ${to}`;

        const mailOptions = {
            from: process.env.MAIL_ID,
            to: to,
            subject: subject,
            text: text,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email send successfully", info.messageId);
        return info;
    } catch (error) {
        console.error(err);
        throw error;
    }
};
