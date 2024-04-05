import { RequestHandler, Request, Response, NextFunction } from "express";
import CreditCardGenerator from "../helper/card.helper";

export const generateCreditCardHandler: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const vendor = req.body.vendor
  const count = parseInt(req.body.count)
  
  let cardDetails;

  if (count) {
    cardDetails = CreditCardGenerator.generateMultiple(vendor, count);
  } else {
    cardDetails = CreditCardGenerator.generateSingle(vendor);
  }

  return res.status(200).json({ responseCode: '00', message: `${vendor} card generated successfully`, data: cardDetails })
}
