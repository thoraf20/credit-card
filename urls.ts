import { Router } from "express";
import { generateCreditCardHandler, generateDifferentMultipleCreditCardHandler } from "./src/controllers/card";


const router = new Router();

router.post('/generate_card',generateCreditCardHandler)
router.post('/generate_card/multiple', generateDifferentMultipleCreditCardHandler);

export default router;