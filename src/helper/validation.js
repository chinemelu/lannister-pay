import { string, boolean, undefined } from '../constants/dataTypes.js'
import listOfCountries from './listOfCountries.js'
import listOfCurrencies from './listOfCurrencies.js'
import listOfPaymentEntityTypes from './listOfPaymentEntityTypes.js'
import listOfPaymentEntityCardTypes from './listOfPaymentEntityCardTypes.js'

export const isInputEmpty = (val) => isUndefined(val) || isEmptyString(val)

export const isEmptyString = (val) => {
  return isString(val) && !val.length
}
export const isInteger = (val) => {
  return typeof val !== undefined
  && (val === parseInt(val, 10));
}
export const isPositiveInteger = (val) => isInteger(val) && val >= 0
export const isString = (val) => typeof val === string || val instanceof String
export const isValidCurrency = (val) => {
  const currenciesWithOnlyThreeLetterSymbol = listOfCurrencies().map(currency => currency.cc);
  return currenciesWithOnlyThreeLetterSymbol.includes(val.trim())
}

export const isValidTwoLetterCodeCountry = (val) => {
  const listOfTwoLetterCodeCountries = listOfCountries().map(country => country.alpha2.toUpperCase())
  return listOfTwoLetterCodeCountries.includes(val.trim())
}

export const isValidEmail = (email) => {
  const emailValidationRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email) {
    email = email.toLowerCase()
  }
  return emailValidationRegex.test(email.trim());
}

export const isCustomerNameValid = (val) => {
  const validationRegexForOnlyLettersAndSpace = /^[a-zA-Z\s]*$/
  return validationRegexForOnlyLettersAndSpace.test(val);
}

export const isBoolean = (val) => {
  return typeof (val) === boolean
}

export const isUndefined = (val) => {
  return typeof (val) === undefined;
}

export const isValidPaymentEntityType = (val) => {
  return listOfPaymentEntityTypes().includes(val.trim())
}

export const paymentEntityTypeIsACard = (val) => {
  return listOfPaymentEntityCardTypes().includes(val.trim())
}

export const isValidMaskedCardNumber = (val) => {
  const regexForValidation = /^\d{6}\*{6}\d{4}$/
  return regexForValidation.test(val.trim())
}

export const isValidSixID = (SixID, CardNumber) => {
  const firstSixDigitsOfCardNumber = CardNumber.substring(0, 6);
  return SixID.toString().length === 6 && SixID === firstSixDigitsOfCardNumber
}
