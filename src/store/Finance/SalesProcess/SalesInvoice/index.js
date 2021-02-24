import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel"

const Customer = new StateArrayModel({ stateName: "sales_invoice" })

Customer.createSlice()
Customer.setURL("/sales-invoices")

export const {
    reducer,
    stateName
} = Customer.getEntity()

export const {
    Add, Fetch, Edit, Patch, Remove
} = Customer.getAPIHandles()

export const { getLoading } = Customer

export const {
    selectAddStatus, selectFetchStatus, selectEditStatus, selectPatchStatus, selectDeleteStatus,
    selectData
} = Customer.getSelectors()

export { selectData as selectSalesInvoices }

export default reducer