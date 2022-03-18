import { LOCL_TEXT, INTL_TEXT } from "../constants/locale.js"
import { ASTERISK } from "../constants/symbol.js"

export const determineLocale = ({ CountryOfEntity, CurrencyCountry }) => {
  if (CountryOfEntity === CurrencyCountry) {
    return LOCL_TEXT
  }
  return INTL_TEXT
}

export const getApplicableFeeConfigurationSpec = ({ parsedFcsArray, transactionRequestObject }) => {
  let feeApplicationFeeConfigurationSpec = { };
  let maxPrecedenceCount = -Infinity

  parsedFcsArray.forEach(fcsItem => {
    const fcsFeeEntityProperty = fcsItem.feeEntityProperty
    const fcsLocale = fcsItem.feeLocale
    const fcsCurrency = fcsItem.currency
    const fcsFeeEntity = fcsItem.feeEntity
    const fcsPrecedenceCount = fcsItem.precedenceCount

    if (conditionsForChoosingFeeConfigurationSpec({
      fcsFeeEntityProperty, 
      transactionRequestObject, 
      fcsLocale, 
      fcsCurrency, 
      fcsFeeEntity,
      fcsPrecedenceCount,
      maxPrecedenceCount
    })) {
        maxPrecedenceCount = fcsPrecedenceCount
        feeApplicationFeeConfigurationSpec = { ...fcsItem }
      }
  })
  return feeApplicationFeeConfigurationSpec;
}

const conditionsForChoosingFeeConfigurationSpec = ({ 
  fcsFeeEntityProperty, 
  transactionRequestObject, 
  fcsLocale, 
  fcsCurrency, 
  fcsFeeEntity,
  fcsPrecedenceCount,
  maxPrecedenceCount 
}) => {

  return conditionOne({ fcsFeeEntityProperty, transactionRequestObject }) 
  && conditionTwo({ fcsLocale, transactionRequestObject }) 
  && conditionThree({ fcsCurrency, transactionRequestObject }) 
  && conditionFour({ fcsFeeEntity, transactionRequestObject }) 
  && fcsPrecedenceCount > maxPrecedenceCount
}
const conditionOne = ({ fcsFeeEntityProperty, transactionRequestObject }) => {
  /* 
    in this condition, for it to be true, one of payment entity's ID
    Issue, Brand, Number, SixID would be equal to the fee entity property in the fee configuration spec
    or the fee entity property in the fee config spec will be '*'
  */
    const paymentEntityID = transactionRequestObject.paymentEntityID
    const paymentEntityIssue = transactionRequestObject.paymentEntityIssue
    const paymentEntityBrand = transactionRequestObject.paymentEntityBrand
    const paymentEntityNumber = transactionRequestObject.paymentEntityNumber
    const paymentEntitySixID = transactionRequestObject.paymentEntitySixID

    return fcsFeeEntityPropertyIsAny(fcsFeeEntityProperty) || fcsFeeEntityPropertyIsPaymentEntitySixID({ 
      fcsFeeEntityProperty, paymentEntitySixID 
    }) || fcsFeeEntityPropertyIsPaymentEntityNumber({ fcsFeeEntityProperty, paymentEntityNumber}) || 
      fcsFeeEntityPropertyIsPaymentEntityBrand({ fcsFeeEntityProperty, paymentEntityBrand }) ||
      fcsFeeEntityPropertyIsPaymentEntityIssue({ fcsFeeEntityProperty, paymentEntityIssue }) ||
      fcsFeeEntityPropertyIsPaymentEntityID ({ fcsFeeEntityProperty, paymentEntityID })
}

const propertyIsAny = (property) => {
  return property === ASTERISK
}

// condition One
const fcsFeeEntityPropertyIsPaymentEntityID = ({ fcsFeeEntityProperty, paymentEntityID }) => {
  return paymentEntityID === fcsFeeEntityProperty
}
const fcsFeeEntityPropertyIsPaymentEntityIssue = ({ fcsFeeEntityProperty, paymentEntityIssue }) => {
  return paymentEntityIssue === fcsFeeEntityProperty
}
const fcsFeeEntityPropertyIsPaymentEntityBrand = ({ fcsFeeEntityProperty, paymentEntityBrand }) => {
  return paymentEntityBrand === fcsFeeEntityProperty
}
const fcsFeeEntityPropertyIsPaymentEntityNumber = ({ fcsFeeEntityProperty, paymentEntityNumber}) => {
  return paymentEntityNumber === fcsFeeEntityProperty
}
const fcsFeeEntityPropertyIsPaymentEntitySixID = ({ fcsFeeEntityProperty, paymentEntitySixID}) => {
  return paymentEntitySixID === fcsFeeEntityProperty
}

const fcsFeeEntityPropertyIsAny = (fcsFeeEntityProperty) => propertyIsAny(fcsFeeEntityProperty)
const fcsLocaleIsAny = (fcsLocale) => propertyIsAny(fcsLocale)
const fcsCurrencyIsAny = (fcsCurrency) => propertyIsAny(fcsCurrency)
const fcsFeeEntityTypeIsAny = (fcsFeeEntityType) => propertyIsAny(fcsFeeEntityType)

// condition two
const conditionTwo = ({ fcsLocale, transactionRequestObject }) => {
  /* 
    in this condition, for it to be true, the calculated locale  
    from the provided CurrencyCountry and payment entity country
    will be equal to that in the fee configuration spec or the locale in 
    the spec will be '*'
  */
  const requestLocale = transactionRequestObject.locale
  return (requestLocale === fcsLocale) || fcsLocaleIsAny(fcsLocale);
}

// condition three
const conditionThree = ({ fcsCurrency, transactionRequestObject }) => {
  /* 
    in this condition, for it to be true, the currency from the provided transaction 
    details will be equal to that in the fee configuration spec or the currency in the spec
    will be '*'
  */
  const requestCurrency = transactionRequestObject.Currency
  return (fcsCurrency === requestCurrency) || fcsCurrencyIsAny(fcsCurrency);
}

// condition four
const conditionFour = ({ fcsFeeEntity, transactionRequestObject }) => {
  /* 
    in this condition, for it to be true, the entity type from the provided transaction 
    details will be equal to that in the fee configuration spec or the entity type in the spec
    will be '*'
  */
  const requestFeeEntity = transactionRequestObject.paymentEntityType
  return (fcsFeeEntity === requestFeeEntity) || fcsFeeEntityTypeIsAny(fcsFeeEntity);
}