import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel"

const InventoryPostingSetup = new StateArrayModel({ stateName: "inventory_posting_setups" })

InventoryPostingSetup.setInitialState()
InventoryPostingSetup.createSlice()
InventoryPostingSetup.setURL("/inventory-posting-setups")

export const {
    selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus, selectData
} = InventoryPostingSetup.getSelectors()

export const {
    stateName, reducer
} = InventoryPostingSetup.getEntity()

export { selectData as selectInventoryPostingSetups }

export const {
    Add, Edit, Fetch, Remove
} = InventoryPostingSetup.getAPIHandles()