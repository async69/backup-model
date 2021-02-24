import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel"

const CustomerPostingGroup = new StateArrayModel({ stateName: "customer_posting_groups" })

CustomerPostingGroup.setInitialState()
CustomerPostingGroup.createSlice()
CustomerPostingGroup.setURL("/customer-posting-groups")

export const {
    selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus, selectData
} = CustomerPostingGroup.getSelectors()

export const {
    stateName, reducer
} = CustomerPostingGroup.getEntity()

export { selectData as selectCustomerPostingGroups }

export const {
    Add, Edit, Fetch, Remove
} = CustomerPostingGroup.getAPIHandles()

export const { getLoading } = CustomerPostingGroup