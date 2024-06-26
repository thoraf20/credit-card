import {
  ICreditCardDetails,
  ICreditCardPreset,
  CreditCardVendor,
} from "../../utils/index";

export default class CreditCardGenerator {
  private static creditCardPresets: ICreditCardPreset[] = [
    {
      digitCount: 16,
      prefixes: ["4539", "4556", "4916", "4532", "4929", "4485", "4716", "4"],
    },
    {
      digitCount: 16,
      prefixes: ["51", "52", "53", "54", "55"],
    },
    {
      digitCount: 15,
      prefixes: ["34", "37"],
    },
    {
      digitCount: 16,
      prefixes: ["300", "301", "302", "303", "36", "38"],
    },
    {
      digitCount: 16,
      prefixes: ["6011"],
    },
    {
      digitCount: 16,
      prefixes: ["2014", "2149"],
    },
    {
      digitCount: 16,
      prefixes: ["35"],
    },
    {
      digitCount: 16,
      prefixes: ["8699"],
    },
  ];

  public static generateSingle(vendor: string): ICreditCardDetails {
    const expireDetails = this.generateExpiryDate();

    return {
      cardNumber: this.generateWithPreset(this.creditCardPresets[vendor]),
      expireMonth: expireDetails.expireMonth,
      expiryYear: expireDetails.expiryYear,
      cvv: this.generateMockCVVNumber(),
    };
  }

  public static generateMultiple(
    vendor: string,
    count: number
  ): any[] {
    if (!this.creditCardPresets[vendor]) {
      throw new Error(
        "[CreditCardGenerator] Unknown credit card vendor '" + vendor + "'"
      );
    }

    const preset = this.creditCardPresets[vendor];
    const numbers = [];

    while (numbers.length < count) {
      const expireDetails = this.generateExpiryDate();

      numbers.push({
        cardNumber: this.generateWithPreset(preset),
        expireMonth: expireDetails.expireMonth,
        expiryYear: expireDetails.expiryYear,
        cvv: this.generateMockCVVNumber(),
      });
    }

    return numbers;
  }

  public static generateWithPreset(preset: ICreditCardPreset): string {
    const prefix =
      preset.prefixes[Math.floor(Math.random() * preset.prefixes.length)];
    const numberWithPrefix =
      prefix + this.generateRandomNumber(preset.digitCount);
    const checksum = this.calculateChecksum(numberWithPrefix);

    return numberWithPrefix + checksum;
  }

  private static generateRandomNumber(length: number): string {
    let cardNumber = "";

    while (cardNumber.length < length - 1) {
      cardNumber += Math.floor(Math.random() * 10);
    }

    return cardNumber;
  }

  private static calculateChecksum(cardNumber: string): number {
    const reversedCardNumber = this.reverseString(cardNumber);
    const reversedCardNumberArray = reversedCardNumber.split("");
    let sum = 0;

    for (let i = 1; i < reversedCardNumberArray.length; i++) {
      sum +=
        parseInt(reversedCardNumberArray[i]) +
        parseInt(reversedCardNumberArray[i - 1]);
    }

    return ((Math.floor(sum / 10) + 1) * 10 - sum) % 10;
  }

  private static reverseString(string: string): string {
    const stringParts = string.split("");
    const reverseArray = stringParts.reverse();

    return reverseArray.join("");
  }

  public static generateExpiryDate(year: number | null = null) {
    const currentYear = year !== null ? year : new Date().getFullYear();
    const expiryYear = ((currentYear % 100) + 4).toString();
    const expiryMonth = (Math.floor(Math.random() * 12) + 1).toString();
    return {
      expireMonth: expiryMonth.length < 2 ? "0" + expiryMonth : expiryMonth,
      expiryYear: expiryYear,
    };
  }

  public static generateMockCVVNumber(): string {
    let cvvNumber = "";
    for (let i = 0; i < 3; i++) {
      cvvNumber += Math.floor(Math.random() * 10);
    }
    // const oddDigits = cvvNumber.split('').filter((_, index) => index % 2 !== 0);
    // const doubleOddDigits = oddDigits.map((digit) => parseInt(digit) * 2);

    // const sumOfDigits = doubleOddDigits.reduce((sum, digit) => {
    //   if (digit < 10) {
    //         console.log(sum + digit);

    //     return sum + digit;
    //   } else {
    //                 console.log(
    //                   sum + Math.floor(digit / 10) + (digit % 10)
    //                 );

    //     return sum + Math.floor(digit / 10) + (digit % 10);
    //   }
    // }, 0);
    // const checkDigit = (10 - (sumOfDigits % 10)) % 10;
    // console.log({ checkDigit });
    // cvvNumber = `${checkDigit}`

    return cvvNumber;
  }
}
