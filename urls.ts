import { Router } from "express";
import { generateCreditCardHandler } from "./src/controllers/card";


const router = new Router();

router.post('/generate_card',generateCreditCardHandler )

export default router;