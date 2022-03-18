export const trimStringValues = (val) => {
  return val.trim()
}

export const convertNumberToTwoDecimalPlaces = (val) => {
  val = val.toFixed(2)
  return Number(val);
}