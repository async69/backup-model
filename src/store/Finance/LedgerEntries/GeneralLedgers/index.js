import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel"

const GeneralLedgerEntries =  new StateArrayModel({ stateName: "general_ledger_entries"})
GeneralLedgerEntries.setURL("/general-ledgers")

GeneralLedgerEntries.createSlice()

export const {
    stateName, reducer
} = GeneralLedgerEntries.getEntity()   

export const {
    selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus, selectData
} = GeneralLedgerEntries.getSelectors()

export const {
    Add, Fetch, Edit, Remove
} = GeneralLedgerEntries.getAPIHandles()

export { selectData as selectGeneralLedgerEntries }