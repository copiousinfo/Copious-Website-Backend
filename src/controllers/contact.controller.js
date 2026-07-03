import { createContact } from "../services/contact.service.js";
import logger from "../utils/logger.utils.js";

export const submitContact = async (req, res) => {
  try {
    const contact = await createContact(req.body);
    logger.info(`New contact submission: ${contact.email}`);

    return res.status(201).json({
      success: true,
      message: "Thank you for reaching out. We'll get back to you soon.",
    });
  } catch (err) {
    logger.error(`Contact submission failed: ${err.message}`);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};
