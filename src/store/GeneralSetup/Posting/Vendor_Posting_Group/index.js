import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel"

const VendorPostingGroup = new StateArrayModel({ stateName: "vendor_posting_groups" })

VendorPostingGroup.setInitialState()
VendorPostingGroup.createSlice()
VendorPostingGroup.setURL("/vendor-posting-groups")

export const {
    selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus, selectData
} = VendorPostingGroup.getSelectors()

export const {
    stateName, reducer
} = VendorPostingGroup.getEntity()

export { selectData as selectVendorPostingGroup }

export const {
    Add, Edit, Fetch, Remove
} = VendorPostingGroup.getAPIHandles()