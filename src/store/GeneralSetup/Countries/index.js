import StateArrayModel from "../../../wrappers/StateModels/StateArrayModel"

const url = "/countries"
const Country = new StateArrayModel({ stateName: "countries" })

Country.createSlice()
Country.setURL(url)

export const {
    reducer,
    stateName
} = Country.getEntity()

export const {
    Add, Fetch, Edit, Remove
} = Country.getAPIHandles()

export const {
    selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus,
    selectData
} = Country.getSelectors()

export { selectData as selectCountries }

export default reducer