import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel"

const VATPostingSetup = new StateArrayModel({ stateName: "vat_posting_setup" })

VATPostingSetup.setInitialState()
VATPostingSetup.createSlice()
VATPostingSetup.setURL("/vat-posting-setups")

export const {
    selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus, selectData
} = VATPostingSetup.getSelectors()

export const {
    stateName, reducer
} = VATPostingSetup.getEntity()

export { selectData as selectVATPostingSetups }

export const {
    Add, Edit, Fetch, Remove
} = VATPostingSetup.getAPIHandles()