import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel"

const CustomerLedgerEntries = new StateArrayModel({ stateName: "customer_ledger_entries " })
CustomerLedgerEntries.setURL("/customer-ledgers")

CustomerLedgerEntries.createSlice()

export const {
    stateName, reducer
} = CustomerLedgerEntries.getEntity()

export const {
    selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus, selectData
} = CustomerLedgerEntries.getSelectors()

export const {
    Add, Fetch, Edit, Remove
} = CustomerLedgerEntries.getAPIHandles()

export { selectData as selectCustomerLedgerEntries }