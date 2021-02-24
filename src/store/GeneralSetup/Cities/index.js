import StateArrayModel from "../../../wrappers/StateModels/StateArrayModel"

const url = "/cities"
const City = new StateArrayModel({ stateName: "cities" })

City.createSlice()
City.setURL(url)

export const {
    reducer,
    stateName
} = City.getEntity()

export const {
    Add, Fetch, Edit, Remove
} = City.getAPIHandles()

export const {
    selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus,
    selectData
} = City.getSelectors()

export { selectData as selectCities }

export default reducer