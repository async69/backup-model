import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel"

const Period = new StateArrayModel({ stateName: "new_periods" })

Period.createSlice()
Period.setURL("/periods")

export const {
    reducer,
    stateName
} = Period.getEntity()

export const {
    Add, Fetch, Edit, Remove
} = Period.getAPIHandles()

export const {
    selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus,
    selectData
} = Period.getSelectors()

export { selectData as selectPeriods }

export default reducer