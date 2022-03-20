const isValidFcsFormat = (val) => {
  const regexForFcsFormatValidation = /^[A-Z0-9]{8} (\*|[A-Z]{3}) (LOCL|INTL|\*) (CREDIT-CARD|DEBIT-CARD|BANK-ACCOUNT|USSD|WALLET-ID|\*)\(([A-Z]+|\d+|\d{6}\*{6}\d{4}|\*)\) \: APPLY (PERC \d*\.?\d{1,2}|FLAT_PERC \d*\.?\d{1,2}\:\d*\.?\d{1,2}|FLAT \d*\.?\d{1,2})$/

  return regexForFcsFormatValidation.test(val)
}

export default isValidFcsFormat