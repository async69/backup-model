import StateArrayModel from "../../../wrappers/StateModels/StateArrayModel"

const url = "/regions"
const Region = new StateArrayModel({ stateName: "regions" })

Region.createSlice()
Region.setURL(url)

export const {
    reducer,
    stateName
} = Region.getEntity()

export const {
    Add, Fetch, Edit, Remove
} = Region.getAPIHandles()

export const {
    selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus,
    selectData
} = Region.getSelectors()

export { selectData as selectRegions }

export default reducer