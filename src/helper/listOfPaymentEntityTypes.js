import { CREDIT_CARD, DEBIT_CARD, BANK_ACCOUNT, USSD, WALLET_ID } from "../constants/paymentEntityTypes.js"

const listOfPaymentEntityTypes = () => {
  return [
    CREDIT_CARD,
    DEBIT_CARD,
    BANK_ACCOUNT,
    USSD,
    WALLET_ID
  ]
}

export default listOfPaymentEntityTypes