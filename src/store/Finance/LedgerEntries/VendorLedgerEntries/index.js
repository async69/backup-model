import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel"


const VendorLedgerEntries = new StateArrayModel({ stateName: "vender_ledger_entries" })
VendorLedgerEntries.setURL("/vender-ledgers")


VendorLedgerEntries.createSlice()

export const {
    stateName, reducer
} = VendorLedgerEntries.getEntity()

export const {
    selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus, selectData
} = VendorLedgerEntries.getSelectors()

export const {
    Add, Fetch, Edit, Remove
} = VendorLedgerEntries.getAPIHandles()

export { selectData as selectVendorLedgerEntries }