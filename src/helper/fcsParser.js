import { ASTERISK, COLON } from "../constants/symbol.js";
import { PERC, FLAT, FLAT_PERC } from '../constants/fcs.js'

const fcsParser = (fcs) => {
  let indexOfLastLetterBeforeSpace = 0
  let precedenceCount = 0;
  // feeId is the first 8 words of the 
  const feeId = fcs.substring(0, 8)
  // the feeId stopped at index 7
  indexOfLastLetterBeforeSpace = 7
  let currency = ""
  /* if the currency is *, it will start at index 9 and the next will begin at 11  
  unless it will start at index 9 due to space in between */
  const firstIndexOfCurrency = indexOfLastLetterBeforeSpace + 2
  if (fcs[firstIndexOfCurrency] === ASTERISK) {
    currency = ASTERISK
    indexOfLastLetterBeforeSpace = firstIndexOfCurrency
  } else {
    precedenceCount ++
    /* The currency is a 3 letter word and the 3rd letter doesn't count
    due to how substring function works */
    const lastIndexOfCurrency = firstIndexOfCurrency + 3
    currency = fcs.substring(firstIndexOfCurrency, lastIndexOfCurrency)
    // the currency ends at index 12 (which is not counted in the calculation)
    indexOfLastLetterBeforeSpace = lastIndexOfCurrency - 1;
  }
  
  let feeLocale = ""
  // the locale is either * or 4 letters (LOCL or INTL)
  const firstIndexOfFeeLocale = indexOfLastLetterBeforeSpace + 2
  if (fcs[firstIndexOfFeeLocale] === ASTERISK) {
    feeLocale = ASTERISK
    indexOfLastLetterBeforeSpace = firstIndexOfFeeLocale
  } else {
    precedenceCount ++
    /* the feeLocale is a 4 letter word and the 4th letter doesn't count due
    to how substring function works */
    const lastIndexOfFeeLocale = firstIndexOfFeeLocale + 4;
    feeLocale = fcs.substring(firstIndexOfFeeLocale, lastIndexOfFeeLocale);
    // the currency ends at index 17 (which is not counted in the calculation)
    indexOfLastLetterBeforeSpace = lastIndexOfFeeLocale - 1
  }
  
  const indexOfFirstParenthesisBorderingTheFeeEntityProperty = fcs.indexOf('(');
  const feeEntity = fcs
    .substring(
      indexOfLastLetterBeforeSpace + 2, 
      indexOfFirstParenthesisBorderingTheFeeEntityProperty
    )
    if (feeEntity !== ASTERISK) {
      precedenceCount++
    }

  // the fee Entity Property is between the parenthesis
  const indexOfClosingParenthesisOfFeeEntityProperty = fcs.indexOf(')');
  /* the fee entity property is between the index of the first parenthesis and 
  the index of the second parenthesis + 1 (due to substring calucation) */
  const feeEntityProperty = fcs
    .substring(
      indexOfFirstParenthesisBorderingTheFeeEntityProperty + 1, 
      indexOfClosingParenthesisOfFeeEntityProperty
    )
  
  if (feeEntityProperty !== ASTERISK) {
    precedenceCount++
  }

  const feeType = determineFeeType(fcs);
  const feeValue = determineValueOfFeeType({ feeType, fcs })

  return { precedenceCount, feeId, currency, feeType, feeLocale, feeEntity, feeEntityProperty, feeValue  }
}

const determineFeeType = (fcs) => {
  /* last index of is used in case the feeId has "PERC", "FLAT" or "FLAT_PERC" 
  in it */
  const indexOfPerc = fcs.lastIndexOf(PERC)
  const indexOfFlat = fcs.lastIndexOf(FLAT)
  const indexOfFlatPerc = fcs.lastIndexOf(FLAT_PERC)
  /* in the rare chance that the feeId has "PERC" OR "FLAT" and the "FLAT_PERC" field also isn't present.
  Choose the bigger one for the feeType since it is closer to the end */
  if (indexOfPerc > -1 && indexOfFlat > -1 && indexOfFlatPerc === -1) {
    if (indexOfPerc > indexOfFlat) {
      return PERC
    }
    return FLAT
  }


  /* Checking for an index of "FLAT" or "PERC" will clash with the index of "FLAT_PERC" 
    value  add a condition of when indexOfFlatPerc isn't present*/
  if (indexOfPerc > -1 && indexOfFlatPerc === -1) {
    // if PERC is present but no FLAT_PERC
    return PERC
  }
  if (indexOfFlat > -1 && indexOfFlatPerc === -1) {
    // if FLAT is present but no FLAT_PERC
    return FLAT
  }
  if (indexOfFlatPerc > -1) {
    // if FLAT_PERC is present
    return FLAT_PERC
  }
}

const determineValueOfFeeType = ({ feeType, fcs }) => {
  let value = { perc: 0, flat: 0 }

  if (feeType === PERC) {
    const startingIndexOfPerc = fcs.lastIndexOf(PERC)
    const endingIndexOfPerc = startingIndexOfPerc + 3
    value.perc = Number(fcs.substring(endingIndexOfPerc + 2))
  }

  if (feeType === FLAT) {
    const startingIndexOfFlat = fcs.lastIndexOf(FLAT)
    const endingIndexOfFlat = startingIndexOfFlat + 3
    value.flat = Number(fcs.substring(endingIndexOfFlat + 2))
  }

  if (feeType === FLAT_PERC) {
    const indexOfColonInValue = fcs.lastIndexOf(COLON);
    const startingIndexOfFlatPerc = fcs.lastIndexOf(FLAT_PERC)
    /* there are 8 characters between the starting index of flat_perc and
    the ending index */
    const endingIndexOfFlatPerc = startingIndexOfFlatPerc + 8
    /* this is calculated from the space between the endingIndexOfFlatPerc
    and the first index of flat value*/
    const startingIndexOfFlatValue = endingIndexOfFlatPerc + 2
    const flatValue = fcs.substring(startingIndexOfFlatValue, indexOfColonInValue);
    const startingIndexOfPercValue = indexOfColonInValue + 1
    const percValue = fcs.substring(startingIndexOfPercValue)
    value.flat = Number(flatValue)
    value.perc = Number(percValue)
  }

  return value;
}

export default fcsParser;