import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel"

const GeneralBusinessPostingSetup = new StateArrayModel({ stateName: "general_business_posting_setups" })

GeneralBusinessPostingSetup.setInitialState()
GeneralBusinessPostingSetup.createSlice()
GeneralBusinessPostingSetup.setURL("/general-business-posting-setups")

export const {
    selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus, selectData
} = GeneralBusinessPostingSetup.getSelectors()

export const { getLoading } = GeneralBusinessPostingSetup

export const {
    stateName, reducer
} = GeneralBusinessPostingSetup.getEntity()

export { selectData as selectGeneralBusinessPostingSetups }

export const {
    Add, Edit, Fetch, Remove
} = GeneralBusinessPostingSetup.getAPIHandles()