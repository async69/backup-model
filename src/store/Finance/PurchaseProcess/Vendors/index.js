import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel"

const Vendor = new StateArrayModel({ stateName: "vendors_new" })

Vendor.createSlice()
Vendor.setURL("/vendors")

export const {
    reducer,
    stateName
} = Vendor.getEntity()

export const {
    Add, Fetch, Edit, Remove
} = Vendor.getAPIHandles()

export const {
    selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus,
    selectData
} = Vendor.getSelectors()

export { selectData as selectVendors }

export default reducer