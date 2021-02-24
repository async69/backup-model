import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel"

const SalesLedgerEntries = new StateArrayModel({ stateName: "sales_ledger_entries " })
SalesLedgerEntries.setURL("/sales-ledgers?limit=100")

SalesLedgerEntries.createSlice()

export const {
    stateName, reducer
} = SalesLedgerEntries.getEntity()

export const {
    selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus, selectData
} = SalesLedgerEntries.getSelectors()

export const {
    Add, Fetch, Edit, Remove
} = SalesLedgerEntries.getAPIHandles()

export { selectData as selectSalesLedgerEntries }