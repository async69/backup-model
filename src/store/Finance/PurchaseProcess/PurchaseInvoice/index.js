import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel"

const PurchaseInvoice = new StateArrayModel({ stateName: "new_purchase_invocies" })

PurchaseInvoice.createSlice()
PurchaseInvoice.setURL("/purchase-invoices")

export const {
    reducer,
    stateName
} = PurchaseInvoice.getEntity()

export const {
    Add, Fetch, Edit, Remove, Patch
} = PurchaseInvoice.getAPIHandles()

export const {
    selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus,
    selectData, selectPatchStatus
} = PurchaseInvoice.getSelectors()

export { selectData as selectPurchaseInvoices }

export default reducer