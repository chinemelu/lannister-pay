import fcsParser from "../helper/fcsParser.js"
import { determineLocale, getApplicableFeeConfigurationSpec } from "../helper/fee.js"
import { calculateAppliedFeeValue } from '../helper/calculateAppliedFeeValue.js'
import { readFile, writeFile } from "../helper/file.js"
import { FCS_ARRAY_TEXT_FILE } from '../constants/file.js'

export const postFeesController = async (req, res) => {
  try {

    const unparsedFcsString = req.body.FeeConfigurationSpec


    if (!unparsedFcsString) {
      res.status(400).json({
        message: 'No Fee Configuration Specification included',
        statusCode: 400,
      })
      return
    }

    const unparsedFcsArray = unparsedFcsString.split(/\r\n|\r|\n/)

    const parsedFcsArray = unparsedFcsArray.map(arrayElem => fcsParser(arrayElem))

    // the array is converted to a string as a valid parameter for the writeFile function
    const stringifiedParsedFcsArray = JSON.stringify(parsedFcsArray)

    await writeFile(FCS_ARRAY_TEXT_FILE, stringifiedParsedFcsArray)

    res.status(200).json({
      status: "ok",
    })
  } catch(error) {
      res.status(500).json({
        error
      })
  }
}

export const computeTransactionFeesController = async (req, res) => {
  try {
    const {
      Currency,
      CurrencyCountry,
      PaymentEntity,
      Amount,
      Customer,
    } = req.body

    const CountryOfEntity = PaymentEntity.Country;

    // the parsed fcs Array will come as a json string
    const stringifiedParsedFcsArray = await readFile(FCS_ARRAY_TEXT_FILE)

    let parsedFcsArray = []

    if (stringifiedParsedFcsArray) {
      parsedFcsArray = JSON.parse(stringifiedParsedFcsArray)
    }

    const thereIsContentInTheFcsArray = parsedFcsArray.length > 0
    if (thereIsContentInTheFcsArray) {
      // determine locale
      const locale = determineLocale({ CountryOfEntity, CurrencyCountry })

      const transactionRequestObject = {
        paymentEntityID: PaymentEntity.ID,
        paymentEntityIssue: PaymentEntity.Issuer,
        paymentEntityBrand: PaymentEntity.Brand,
        paymentEntityNumber: PaymentEntity.Number,
        paymentEntitySixID: PaymentEntity.SixID,
        paymentEntityType: PaymentEntity.Type,
        locale,
        Currency,
      }

      const applicableFeeConfigSpec = getApplicableFeeConfigurationSpec({ 
        parsedFcsArray, 
        transactionRequestObject,
      })

      const noApplicableFeeConfigSpec = !Object.keys(applicableFeeConfigSpec).length

      if (noApplicableFeeConfigSpec) {
        return res.status(404).json({
          Error: 'There is no fee configuration specification for this transaction',
        })
      }

      const feeValueObject = calculateAppliedFeeValue({ 
        fcs: applicableFeeConfigSpec, 
        Amount, 
        CustomerBearsFee: Customer.BearsFee 
      })

      return res.status(200).json(feeValueObject)
    }

    res.status(404).json({
      Error: 'There is no fee configuration specification on the server'
    })
    
  } catch(error) {
    res.status(500).json({
      error
    })
  }
}