import { Router } from "express";
import { submitContact } from "../controllers/contact.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { contactSchema } from "../validations/contact.validation.js";

const router = Router();

router.post("/", validate(contactSchema), submitContact);

export default router;
