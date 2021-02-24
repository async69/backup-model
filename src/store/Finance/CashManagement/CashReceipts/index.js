import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel"

const CashReceipt = new StateArrayModel({ stateName: "cash_receipts" })

CashReceipt.createSlice()
CashReceipt.setURL("/cash-receipts")

export const {
    reducer,
    stateName
} = CashReceipt.getEntity()

export const {
    Add, Fetch, Edit, Remove
} = CashReceipt.getAPIHandles()

export const {
    selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus,
    selectData
} = CashReceipt.getSelectors()

export { selectData as selectCashReceipts }