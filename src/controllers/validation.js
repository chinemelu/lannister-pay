import { check } from 'express-validator';

import { 
  isInputEmpty, 
  isPositiveInteger, 
  isValidCurrency, 
  isValidTwoLetterCodeCountry,
  isValidEmail
} from '../helper/validation.js'

export const computeTransactionFeesValidationController = (req, res) => {
  console.log('meh', req.body)
  const { 
    ID, 
    Amount, 
    Currency, 
    CurrencyCountry, 
    Customer,
    PaymentEntity
  } = req.body

  // ID errors
  const isIDEmpty = isInputEmpty(ID)
  const isIDAPositiveInteger = isPositiveInteger(ID)

  // amount errors
  const isAmountEmpty = isInputEmpty(Amount)
  const isAmountAPositiveInteger = isPositiveInteger(Amount)


  const isCurrencyEmpty = isInputEmpty(Currency)
  const isCurrencyValid = isValidCurrency(Currency)

  // Currency Country Errors
  const isCurrencyCountryEmpty = isInputEmpty(CurrencyCountry)
  // this check of lowerCase is in the event that the 
  const isCurrencyCountryValid = isValidTwoLetterCodeCountry(CurrencyCountry.toLowerCase())

  const isCustomerEmpty = isInputEmpty(Customer)

  // Customer ID errors

  let isCustomerIDEmpty = true;
  let isCustomerIDAPositiveInteger = false; 
  let isCustomerEmailEmpty = true
  let isCustomerEmailValid = false;

  const isCustomerObjectEmpty = !Object.keys(Customer).length

  if (!isCustomerObjectEmpty && Customer.ID) {
    isCustomerIDEmpty = isInputEmpty(Customer.ID)
    isCustomerIDAPositiveInteger = isPositiveInteger(Customer.ID)
  }

  if ( !isCustomerObjectEmpty && Customer.EmailAddress) {
    isCustomerEmailEmpty = isInputEmpty(Customer.EmailAddress)
    isCustomerEmailValid = isValidEmail(Customer.EmailAddress)
  }

  const isPaymentEntityEmpty = isInputEmpty(PaymentEntity)

  const errors = {};

  // id
  if (isIDEmpty) {
    errors.ID = 'ID Field is required'
  }

  if (!isIDEmpty && !isIDAPositiveInteger) {
    errors.ID = 'ID should be a positive integer'
  }

  // amount 
  if (isAmountEmpty) {
    errors.Amount = 'Amount is required'
  }

  if (!isAmountEmpty && !isAmountAPositiveInteger) {
    errors.Amount = 'Amount should be a positive integer'
  }

  // currency
  if (isCurrencyEmpty) {
    errors.Currency = 'Currency is required'
  }

  if (!isCurrencyEmpty && !isCurrencyValid) {
    errors.Currency = 'Invalid currency'
  }

  // currency country
  if (isCurrencyCountryEmpty) {
    errors.CurrencyCountry = 'The Country Code is required'
  }

  if (!isCurrencyCountryEmpty && !isCurrencyCountryValid) {
    errors.CurrencyCountry = 'Invalid country code'
  }

  // customer id
  if (isCustomerIDEmpty) {
    errors.CustomerID = 'Customer ID Field is required'
  }

  if (!isCustomerIDEmpty && !isCustomerIDAPositiveInteger) {
    errors.CustomerID = 'Customer ID should be a positive integer'
  }

  // Customer Email
  if (isCustomerEmailEmpty) {
    errors.CustomerEmail = 'Customer email is required'
  }

  if (!isCustomerEmailEmpty && !isCustomerEmailValid) {
    errors.CustomerEmail = 'Invalid customer email'
  }


  

  res.status(400).json({
    errors,
    statusCode: res.statusCode
  })


  
}