import { convertNumberToTwoDecimalPlaces } from './helper.js'
export const calculateAppliedFeeValue = ({ fcs, Amount, CustomerBearsFee }) => {
  const AppliedFeeID = fcs.feeId
  const percentageValueOfAppliedFeeValue =  (fcs.feeValue.perc * Amount)/100
  const flatFeeValueOfAppliedFeeValue =  fcs.feeValue.flat
  const AppliedFeeValue = percentageValueOfAppliedFeeValue + flatFeeValueOfAppliedFeeValue
  const ChargeAmount = CustomerBearsFee ? Amount + AppliedFeeValue : Amount
  const SettlementAmount = ChargeAmount - AppliedFeeValue

  return {
    AppliedFeeID,
    AppliedFeeValue: convertNumberToTwoDecimalPlaces(AppliedFeeValue),
    ChargeAmount: convertNumberToTwoDecimalPlaces(ChargeAmount),
    SettlementAmount: convertNumberToTwoDecimalPlaces(SettlementAmount),
  } 
}