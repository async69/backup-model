import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel"

const PurchaseLedgerEntries = new StateArrayModel({ stateName: "purchase_ledger_entries" })
PurchaseLedgerEntries.setURL("/purchase-ledgers")

PurchaseLedgerEntries.createSlice()

export const {
    stateName, reducer
} = PurchaseLedgerEntries.getEntity()

export const {
    selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus, selectData
} = PurchaseLedgerEntries.getSelectors()

export const {
    Add, Fetch, Edit, Remove
} = PurchaseLedgerEntries.getAPIHandles()

export { selectData as selectPurchaseLedgerEntries }