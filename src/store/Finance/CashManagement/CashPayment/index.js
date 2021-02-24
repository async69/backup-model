import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel"

const CashPayment = new StateArrayModel({ stateName: "cash_payments" })

CashPayment.createSlice()
CashPayment.setURL("/cash-payments")

export const {
    reducer,
    stateName
} = CashPayment.getEntity()

export const {
    Add, Fetch, Edit, Remove
} = CashPayment.getAPIHandles()

export const {
    selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus,
    selectData
} = CashPayment.getSelectors()

export { selectData as selectCashPayments }