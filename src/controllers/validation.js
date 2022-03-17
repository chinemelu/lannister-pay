import { 
  isInputEmpty, 
  isPositiveInteger, 
  isValidCurrency, 
  isValidTwoLetterCodeCountry,
  isValidEmail,
  isString,
  isCustomerNameValid,
  isBoolean,
  isUndefined,
  isValidSixID,
  isValidMaskedCardNumber,
  isValidPaymentEntityType,
  paymentEntityTypeIsACard
} from '../helper/validation.js'

export const computeTransactionFeesValidationController = (req, res, next) => {
  const { 
    ID, 
    Amount, 
    Currency, 
    CurrencyCountry, 
    Customer,
    PaymentEntity
  } = req.body

  // Customer ID errors
  const isIDEmpty = isInputEmpty(ID)
  const isIDAPositiveInteger = isPositiveInteger(ID)

  // amount errors
  const isAmountEmpty = isInputEmpty(Amount)
  const isAmountAPositiveInteger = isPositiveInteger(Amount)

  // currency
  const isCurrencyEmpty = isInputEmpty(Currency)
  const isCurrencyAString = isString(Currency)
  const isCurrencyValid = isValidCurrency(Currency)

  
  // Currency Country Errors
  const isCurrencyCountryEmpty = isInputEmpty(CurrencyCountry)
  let isCurrencyCountryAString = isString(CurrencyCountry);
  let isCurrencyCountryValid = false;
  // this check of lowerCase is in the event that the 
  if (isCurrencyCountryAString) {
    isCurrencyCountryValid = isValidTwoLetterCodeCountry(CurrencyCountry)
  }

  // Customer ID errors
  let isCustomerIDEmpty = true;
  let isCustomerIDAPositiveInteger = false; 
  let isCustomerEmailEmpty = true
  let isCustomerEmailValid = false;

    // full name
  let isCustomerFullNameEmpty = true
  let isCustomerFullNameValid = false

  // bears fees
  let isCustomerBearingFeesValid = false

  const isCustomerObjectUndefined = isUndefined(Customer)

  if (!isCustomerObjectUndefined && !isUndefined(Customer.ID)) {
    isCustomerIDEmpty = isInputEmpty(Customer.ID)
    isCustomerIDAPositiveInteger = isPositiveInteger(Customer.ID)
  }

  if (!isCustomerObjectUndefined && !isUndefined(Customer.EmailAddress)) {
    isCustomerEmailEmpty = isInputEmpty(Customer.EmailAddress)
    isCustomerEmailValid = isValidEmail(Customer.EmailAddress)
  }

  if (!isCustomerObjectUndefined && !isUndefined(Customer.FullName)) {
    isCustomerFullNameEmpty = isInputEmpty(Customer.FullName)
    isCustomerFullNameValid = isCustomerNameValid(Customer.FullName)
  }

  if (!isCustomerObjectUndefined && !isUndefined(Customer.BearsFee)) {
    isCustomerBearingFeesValid = isBoolean(Customer.BearsFee)
  }

  // Payment Entity ID errors
  /* let the default values throw errors as they would trigger an error if PaymentEntity
  does not exist */

  let isPaymentEntityIDEmpty = true
  let isPaymentEntityIDAPositiveInteger = false
  let isPaymentEntityIssuerEmpty = true
  let isPaymentEntityIssuerValid = false
  let isPaymentEntityBrandEmpty = true
  let isPaymentEntityBrandValid = false
  let isPaymentEntityNumberEmpty = true
  let isPaymentEntityNumberValid = false
  let isPaymentEntityNumberAString = false
  let isPaymentEntitySixIDEmpty = true
  let isPaymentEntitySixIDValid = false
  let isPaymentEntityTypeEmpty = true
  let isPaymentEntityTypeAString = false
  let isPaymentEntityTypeValid = false
  let isPaymentEntityTypeACard = false

  let isPaymentEntityCountryEmpty = true
  let isPaymentEntityCountryAString = false;
  let isPaymentEntityCountryValid = false;

  if (isPaymentEntityCountryAString) {
    isCurrencyCountryValid = isValidTwoLetterCodeCountry(CurrencyCountry)
  }

  const isPaymentEntityObjectUndefined = isUndefined(PaymentEntity)

  if (!isPaymentEntityObjectUndefined && !isUndefined(PaymentEntity.ID)) {
    isPaymentEntityIDEmpty = isInputEmpty(PaymentEntity.ID)
    isPaymentEntityIDAPositiveInteger = isPositiveInteger(PaymentEntity.ID)
  }

  if (!isPaymentEntityObjectUndefined && !isUndefined(PaymentEntity.Issuer)) {
    isPaymentEntityIssuerEmpty = isInputEmpty(PaymentEntity.Issuer)
    isPaymentEntityIssuerValid = isString(PaymentEntity.Issuer)
  }

  if (!isPaymentEntityObjectUndefined && !isUndefined(PaymentEntity.Brand)) {
    isPaymentEntityBrandEmpty = isInputEmpty(PaymentEntity.Brand)
    isPaymentEntityBrandValid = isString(PaymentEntity.Brand)
  }

  if (!isPaymentEntityObjectUndefined && !isUndefined(PaymentEntity.Number)) {
    isPaymentEntityNumberEmpty = isInputEmpty(PaymentEntity.Number)
    isPaymentEntityNumberAString = isString(PaymentEntity.Number)
    isPaymentEntityNumberValid = isValidMaskedCardNumber(PaymentEntity.Number)
  }

  if (!isPaymentEntityObjectUndefined && !isUndefined(PaymentEntity.SixID)) {
    isPaymentEntitySixIDEmpty = isInputEmpty(PaymentEntity.SixID)
    isPaymentEntitySixIDValid = isValidSixID(PaymentEntity.SixID)
  }

  if (!isPaymentEntityObjectUndefined && !isUndefined(PaymentEntity.Type)) {
    isPaymentEntityTypeEmpty = isInputEmpty(PaymentEntity.Type)
    isPaymentEntityTypeAString = isString(PaymentEntity.Type)
    isPaymentEntityTypeValid = isValidPaymentEntityType(PaymentEntity.Type)
    isPaymentEntityTypeACard= paymentEntityTypeIsACard(PaymentEntity.Type)
  }

  if (!isPaymentEntityObjectUndefined && !isUndefined(PaymentEntity.Country)) {
    isPaymentEntityCountryEmpty = isInputEmpty(PaymentEntity.Country)
    isPaymentEntityCountryAString = isString(PaymentEntity.Country)
    if (isPaymentEntityCountryAString) {
      isPaymentEntityCountryValid = isValidTwoLetterCodeCountry(PaymentEntity.Country)
    }
  }

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

  if (!isCurrencyEmpty && !isCurrencyAString) {
    errors.Currency = 'Currency must be a string'
  }

  if (!isCurrencyEmpty && isCurrencyAString && !isCurrencyValid) {
    errors.Currency = 'Invalid currency'
  }

  // currency country
  if (isCurrencyCountryEmpty) {
    errors.CurrencyCountry = 'The Country Code is required'
  }

  if (!isCurrencyCountryEmpty && !isCurrencyCountryAString) {
    errors.CurrencyCountry = 'The Country Code must be a string'
  }

  if (!isCurrencyCountryEmpty && isCurrencyCountryAString && !isCurrencyCountryValid) {
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

  // Customer fullname
  if (isCustomerFullNameEmpty) {
    errors.FullName = 'Customer name is required'
  }

  if (!isCustomerFullNameEmpty && !isCustomerFullNameValid) {
    errors.FullName = 'Customer\'s name must be a string of letters'
  }

  // Customer BearsFee
  if (!isCustomerBearingFeesValid) {
    errors.BearsFee = "BearsFee property is required and it must be a boolean"
  }

  // Payment Entity Errors

  // payment entity ID
  if (isPaymentEntityIDEmpty) {
    errors.paymentEntityID = 'Payment Entity ID Field is required'
  }

  if (!isPaymentEntityIDEmpty && !isPaymentEntityIDAPositiveInteger) {
    errors.paymentEntityID = 'Payment Entity ID should be a positive integer'
  }

  
  // payment entity issuer
  if (isPaymentEntityIssuerEmpty) {
    errors.PaymentEntityIssuer = 'Payment Entity Issuer is required'
  }

  if (!isPaymentEntityIssuerEmpty && !isPaymentEntityIssuerValid) {
    errors.PaymentEntityIssuer = 'Payment Entity Issuer must be a string'
  }


  // payment entity brand 
  if (isPaymentEntityBrandEmpty && isPaymentEntityTypeACard) {
    errors.PaymentEntityBrand = 'Payment Entity Brand is required'
  }

  if (!isPaymentEntityBrandEmpty && !isPaymentEntityTypeACard) {
    errors.PaymentEntityBrand = 'Payment Entity Brand only applies to card-type transactions'
  }

  if (!isPaymentEntityBrandEmpty && isPaymentEntityTypeACard && !isPaymentEntityBrandValid) {
    errors.PaymentEntityBrand = 'Payment Entity Brand must be a string'
  }

  // payment entity number
  if (isPaymentEntityNumberEmpty) {
    errors.PaymentEntityNumber = 'Payment Entity number is required'
  }

  if (!isPaymentEntityNumberEmpty && !isPaymentEntityNumberAString) {
    errors.PaymentEntityNumber = 'The card number must be a string'
  }

  if (!isPaymentEntityNumberEmpty && isPaymentEntityNumberAString && !isPaymentEntityNumberValid) {
    errors.PaymentEntityNumber = 'Card number must be 16 digits with only the first' +
    ' 6 digits and the last 4 digits showing. The rest should be covered with asterisks.'
  }

  // payment sixID
  if (isPaymentEntitySixIDEmpty) {
    errors.PaymentEntitySixID = 'Payment Entity SixID is required'
  }

  if (!isPaymentEntitySixIDEmpty && !isPaymentEntitySixIDValid) {
    errors.PaymentEntitySixID = 'The SixID should be a 6 digit positive integer'
  }

  // payment entity number
  if (isPaymentEntityTypeEmpty) {
    errors.PaymentEntityType = 'Payment Entity type is required'
  }

  if (!isPaymentEntityTypeEmpty && !isPaymentEntityTypeAString) {
    errors.PaymentEntityType = 'The payment entity type must be a string'
  }

  if (!isPaymentEntityNumberEmpty && isPaymentEntityTypeAString && !isPaymentEntityTypeValid) {
    errors.PaymentEntityType = 'The payment entity type must be one of CREDIT-CARD, DEBIT-CARD, BANK-ACCOUNT, USSD, WALLET-ID'
  }

  // payment entity country
   if (isPaymentEntityCountryEmpty) {
    errors.PaymentEntityCountry = 'The Country Code is required'
  }

  if (!isPaymentEntityCountryEmpty && !isPaymentEntityCountryAString) {
    errors.PaymentEntityCountry = 'The Country Code must be a string'
  }

  if (!isPaymentEntityCountryEmpty && isPaymentEntityCountryAString && !isPaymentEntityCountryValid) {
    errors.PaymentEntityCountry = 'Invalid country code'
  }

  const thereIsAtLeastOneError = Object.keys(errors).length > 0;

  if (thereIsAtLeastOneError) {
    return res.status(400).json({
      errors,
      statusCode: res.statusCode
    })
  }
  next()
}