import { trimStringValues } from '../helper/helper.js'

const trimString = (req, res, next) => {
  const {  
    Currency, 
    CurrencyCountry, 
    Customer,
    PaymentEntity
  } = req.body

  req.body.Currency = trimStringValues(Currency)
  req.body.CurrencyCountry = trimStringValues(CurrencyCountry)
  req.body.Customer.EmailAddress = trimStringValues(Customer.EmailAddress)
  req.body.Customer.FullName = trimStringValues(Customer.FullName)
  req.body.PaymentEntity.Issuer = trimStringValues(PaymentEntity.Issuer)
  req.body.PaymentEntity.Number = trimStringValues(PaymentEntity.Number)
  req.body.PaymentEntity.Brand = trimStringValues(PaymentEntity.Brand)
  req.body.PaymentEntity.Type = trimStringValues(PaymentEntity.Type)
  req.body.PaymentEntity.Country = trimStringValues(PaymentEntity.Country)

  res.status(200).json({
    request: req.body
  })
}

export default trimString