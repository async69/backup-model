import StateArrayModel from "../../../wrappers/StateModels/StateArrayModel"

const Vendor = new StateArrayModel({ stateName: "new_vendors" })

Vendor.setInitialState()
Vendor.createSlice()
Vendor.setURL("/vendors")

export const {
    selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus, selectPatchStatus, selectData
} = Vendor.getSelectors()

export const {
    stateName, reducer
} = Vendor.getEntity()

export { selectData as selectVendors }

export { Add as addVendor }
export { Fetch as fetchVendors }
export default reducer

export const {
    Add, Edit, Patch, Fetch, Remove
} = Vendor.getAPIHandles()