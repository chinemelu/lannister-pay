export const determineLocale = ({ CountryOfEntity, CurrencyCountry }) => {
  if (CountryOfEntity === CurrencyCountry) {
    return 'LOCL'
  }
  return 'INTL'
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

    console.log('fcsLocaleTop', fcsLocale)


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
  // console.log('property', property, property === "*");
  return property === "*"
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
  const requestLocale = transactionRequestObject.locale
      console.log('fcsBottom', fcsLocale)
  return (requestLocale === fcsLocale) || fcsLocaleIsAny(fcsLocale);
}

// condition three
const conditionThree = ({ fcsCurrency, transactionRequestObject }) => {
  const requestCurrency = transactionRequestObject.Currency
  return (fcsCurrency === requestCurrency) || fcsCurrencyIsAny(fcsCurrency);
}

// condition four
const conditionFour = ({ fcsFeeEntity, transactionRequestObject }) => {
  const requestFeeEntity = transactionRequestObject.paymentEntityType
  return (fcsFeeEntity === requestFeeEntity) || fcsFeeEntityTypeIsAny(fcsFeeEntity);
}