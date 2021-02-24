import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel"

const InventoryLedgerEntries = new StateArrayModel({ stateName: "inventory_ledger_entries" })
InventoryLedgerEntries.setURL("/inventory-ledgers")

InventoryLedgerEntries.createSlice()

export const {
    stateName, reducer
} = InventoryLedgerEntries.getEntity()

export const {
    selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus, selectData
} = InventoryLedgerEntries.getSelectors()

export const {
    Add, Fetch, Edit, Remove
} = InventoryLedgerEntries.getAPIHandles()

export { selectData as selectInventoryLedgerEntries }