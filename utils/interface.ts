export interface ICreditCardPreset {
  digitCount: number;
  prefixes: string[];
}

export interface ICreditCardDetails {
  cardNumber: string;
  expireMonth: string;
  expiryYear: string;
  cvv: string;
}
