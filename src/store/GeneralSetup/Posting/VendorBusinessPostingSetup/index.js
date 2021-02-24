import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel"

const VendorPostingSetup = new StateArrayModel({ stateName: "vendor_posting_setups" })

VendorPostingSetup.setInitialState()
VendorPostingSetup.createSlice()
VendorPostingSetup.setURL("/vendor-posting-setups")

export const {
    selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus, selectData
} = VendorPostingSetup.getSelectors()

export const {
    stateName, reducer
} = VendorPostingSetup.getEntity()

export { selectData as selectVendorPostingSetups }

export const {
    Add, Edit, Fetch, Remove
} = VendorPostingSetup.getAPIHandles()