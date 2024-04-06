import { RequestHandler, Request, Response, NextFunction } from "express";
import CreditCardGenerator from "../helper/card.helper";
import { CreditCardVendor, CreditCardType } from "../../utils/index";

export const generateCreditCardHandler: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const vendor = req.body.vendor
  const count = parseInt(req.body.count)

  const allowCardTypes = Object.keys(CreditCardType);

  if (!allowCardTypes.includes(vendor)) {
    return res.status(400).json({ message: `Unknown credit card vendor: ${vendor}` })
  }

  let cardDetails;

  if (count) {
    cardDetails = CreditCardGenerator.generateMultiple(CreditCardVendor[vendor], count);
  } else {
    cardDetails = CreditCardGenerator.generateSingle(CreditCardVendor[vendor]);
  }

  return res.status(200).json({ responseCode: '00', message: `${vendor} card generated successfully`, data: cardDetails })
}

export const generateDifferentMultipleCreditCardHandler: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const vendors = req.body.vendor

  const allowCardTypes = Object.keys(CreditCardType);

  let cardDetails = [];

  vendors.map((vendor) => {
    if (!allowCardTypes.includes(vendor)) {
      return res.status(400).json({ message: `Unknown credit card vendor: ${vendor}` })
    }
    cardDetails.push(CreditCardGenerator.generateSingle(CreditCardVendor[vendor]));
  })
 
  return res.status(200).json({ responseCode: '00', message: `${[...vendors]} cards generated successfully`, data: cardDetails })
}
