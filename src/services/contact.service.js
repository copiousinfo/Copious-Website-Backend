import Contact from "../models/contact.model.js";
import { sendMail } from "../utils/mailer.utils.js";

export const createContact = async (data) => {
  const contact = await Contact.create(data);

  const html = `
    <h3>New Contact Form Submission</h3>
    <p><b>Name:</b> ${data.name}</p>
    <p><b>Email:</b> ${data.email}</p>
    <p><b>Phone:</b> ${data.phone}</p>
    <p><b>Message:</b> ${data.message}</p>
  `;

  await sendMail({
    to: process.env.COMPANY_CONTACT_EMAIL,
    subject: `New Enquiry from ${data.name}`,
    html,
  });

  return contact;
};
