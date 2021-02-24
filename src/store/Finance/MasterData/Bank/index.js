import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel"

const Bank = new StateArrayModel({ stateName: "banks" })

Bank.createSlice()
Bank.setURL("/banks")

export const {
    stateName, reducer
} = Bank.getEntity()

export const {
    selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus,
    selectData
} = Bank.getSelectors()

export { selectData as selectBanks }

export const {
    Add, Fetch, Edit, Remove
} = Bank.getAPIHandles()