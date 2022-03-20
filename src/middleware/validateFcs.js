import isValidFcsFormat from "../helper/isValidFcsFormat.js"
import { isString } from "../helper/validation.js"

const validateFcs = (req, res, next) => {
  const unparsedFcsString = req.body.FeeConfigurationSpec

  if (!isString(unparsedFcsString)) {
    return res.status(400).json({
      message: 'Fee Configuration Specification must be a string',
      statusCode: 400,
    })
  }

  if (!unparsedFcsString) {
    return res.status(400).json({
      message: 'No Fee Configuration Specification included',
      statusCode: 400,
    })
  }

  // convert the unparsedFcsString to an array of Fcs specifications
  const unparsedFcsArray = unparsedFcsString.split(/\r\n|\r|\n/)
  // validate the unparsed fcs array to make sure each fcs has the valid format
  // this is to prevent inaccurate formatting
  const thereIsAtLeastOneInvalidFcs = unparsedFcsArray.some(unparsedFcs => !isValidFcsFormat(unparsedFcs))

  if (thereIsAtLeastOneInvalidFcs) {
    return res.status(400).json({
      Error: "One or more fee configuration specifications has an invalid format",
      hint: {
        feeValue: "All fee values must be valid integers or decimals. The value, if decimal, must have no more than 2 decimal places.",
        letters: "All letters must be capitalized",
        space: "Apply the appropriate spacing required by the Fee Configuration Specification", 
        feeEntity: "The fee entity has set values of CREDIT-CARD, DEBIT-CARD, BANK-ACCOUNT, USSD, WALLET-ID",
        feeType: "The fee type has set values of FLAT, PERC and FLAT_PERC"
      }
    })
  }
  // put the unparsedFcsArray in the req object
  req.unparsedFcsArray = unparsedFcsArray
  next()
}

export default validateFcs