import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel"

const InventoryPostingGroup = new StateArrayModel({ stateName: "inventory_posting_groups" })

InventoryPostingGroup.setInitialState()
InventoryPostingGroup.createSlice()
InventoryPostingGroup.setURL("/inventory-posting-groups")

export const {
    selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus, selectData
} = InventoryPostingGroup.getSelectors()

export const {
    stateName, reducer
} = InventoryPostingGroup.getEntity()

export { selectData as selectInventoryPostingGroups }

export const {
    Add, Edit, Fetch, Remove
} = InventoryPostingGroup.getAPIHandles()