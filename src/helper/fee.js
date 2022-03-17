export const determineLocale = ({ CountryOfEntity, CurrencyCountry }) => {
  if (CountryOfEntity === CurrencyCountry) {
    return 'LOCL'
  }
  return 'INTL'
}

export const getApplicableFeeConfigurationSpec = ({ parsedFcsArray, transactionRequestObject }) => {
  const arrayOfApplicableFeeConfigSpec = [];
  // paymentEntityID: PaymentEntity.ID,
  // paymentEntityIssue: PaymentEntity.Issuer,
  // paymentEntityBrand: PaymentEntity.Brand,
  // paymentEntityNumber: PaymentEntity.Number,
  // paymentEntitySixID: PaymentEntity.SixID,
  // paymentEntityType: PaymentEntity.Type,

  parsedFcsArray.forEach(fcsItem => {
    const fcsFeeEntityProperty = fcsItem.feeEntityProperty
    const fcsLocale = fcsItem.feeLocale
    const fcsCurrency = fcsItem.currency
    const fcsFeeEntity = fcsItem.feeEntity

    if (
        conditionOne({ fcsFeeEntityProperty, transactionRequestObject }) 
        && conditionTwo ({ fcsLocale, transactionRequestObject }) 
        && conditionThree ({ fcsCurrency, transactionRequestObject }) 
        && conditionFour ({ fcsFeeEntity, transactionRequestObject }) 
      ) {
        arrayOfApplicableFeeConfigSpec.push(fcsItem)
      }
  })
  return arrayOfApplicableFeeConfigSpec;
}

export const conditionOne = ({ fcsFeeEntityProperty, transactionRequestObject }) => {
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

export const propertyIsAny = (property) => {
  return "*" === property
}

// condition One
export const fcsFeeEntityPropertyIsPaymentEntityID = ({ feeEntityProperty, paymentEntityID}) => {
  return paymentEntityID === feeEntityProperty
}
export const fcsFeeEntityPropertyIsPaymentEntityIssue = ({ feeEntityProperty, paymentEntityIssue}) => {
  return paymentEntityIssue === feeEntityProperty
}
export const fcsFeeEntityPropertyIsPaymentEntityBrand = ({ feeEntityProperty, paymentEntityBrand}) => {
  return paymentEntityBrand === feeEntityProperty
}
export const fcsFeeEntityPropertyIsPaymentEntityNumber = ({ feeEntityProperty, paymentEntityNumber}) => {
  return paymentEntityNumber === feeEntityProperty
}
export const fcsFeeEntityPropertyIsPaymentEntitySixID = ({ feeEntityProperty, paymentEntitySixID}) => {
  return paymentEntitySixID === feeEntityProperty
}

export const fcsFeeEntityPropertyIsAny = (fcsFeeEntityProperty) => propertyIsAny(fcsFeeEntityProperty)
export const fcsLocaleIsAny = (fcsLocale) => propertyIsAny(fcsLocale)
export const fcsCurrencyIsAny = (fcsCurrency) => propertyIsAny(fcsCurrency)
export const fcsFeeEntityTypeIsAny = (fcsFeeEntityType) => propertyIsAny(fcsFeeEntityType)

// condition two
export const conditionTwo = ({ fcsLocale, transactionRequestObject }) => {
  const requestLocale = transactionRequestObject.locale
  return (fcsLocale === requestLocale) || fcsLocaleIsAny(fcsLocale);
}

// condition three
export const conditionThree = ({ fcsCurrency, transactionRequestObject }) => {
  const requestCurrency = transactionRequestObject.Currency
  return (fcsCurrency === requestCurrency) || fcsCurrencyIsAny(fcsCurrency);
}

// condition four
export const conditionFour = ({ fcsFeeEntity, transactionRequestObject }) => {
  const requestFeeEntity = transactionRequestObject.PaymentEntityType
  return (fcsFeeEntity === requestFeeEntity) || fcsFeeEntityTypeIsAny(fcsFeeEntity);
}