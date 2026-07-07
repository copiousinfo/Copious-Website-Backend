import nodemailer from "nodemailer";
import logger from "./logger.utils.js";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// temporary debugging
transporter.verify((error, success) => {
  if (error) {
    logger.error("SMTP verify error: ", error);
  } else {
    logger.info("SMTP Server is ready");
  }
});

export const sendMail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"Copious Website" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
  } catch (err) {
    logger.error(`Email send failed: ${err.message}`);
    // Not thrown intentionally — DB save should succeed even if email fails
  }
};
