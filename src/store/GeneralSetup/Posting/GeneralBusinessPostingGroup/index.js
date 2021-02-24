import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel"

const GeneralBusinessPostingGroup = new StateArrayModel({ stateName: "general_business_posting_group" })

GeneralBusinessPostingGroup.setInitialState()
GeneralBusinessPostingGroup.createSlice()
GeneralBusinessPostingGroup.setURL("/general-business-posting-groups")

export const {
    selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus, selectData
} = GeneralBusinessPostingGroup.getSelectors()

export const {
    stateName, reducer
} = GeneralBusinessPostingGroup.getEntity()
export const { getLoading } = GeneralBusinessPostingGroup

export { selectData as selectGeneralBusinessPostingGroups }

export const {
    Add, Edit, Fetch, Remove
} = GeneralBusinessPostingGroup.getAPIHandles()