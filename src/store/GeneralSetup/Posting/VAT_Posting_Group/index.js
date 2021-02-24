import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel"

const VATPostingGroups = new StateArrayModel({ stateName: "vat_posting_groups" })

VATPostingGroups.setInitialState()
VATPostingGroups.createSlice()
VATPostingGroups.setURL("/vat-posting-groups")

export const {
    selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus, selectData
} = VATPostingGroups.getSelectors()

export const {
    stateName, reducer
} = VATPostingGroups.getEntity()

export { selectData as selectVATPostingGroups }

export const {
    Add, Edit, Fetch, Remove
} = VATPostingGroups.getAPIHandles()