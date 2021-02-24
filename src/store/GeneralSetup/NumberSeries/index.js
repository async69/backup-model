import StateArrayModel from "../../../wrappers/StateModels/StateArrayModel"

const url = "/documents-number-setups"
const NumberSeries = new StateArrayModel({ stateName: "number_series" })

NumberSeries.createSlice()
NumberSeries.setURL(url)
NumberSeries.enableResults({
    fetchEnabled: false
})

export const {
    reducer,
    stateName
} = NumberSeries.getEntity()

export const {
    Add, Fetch, Edit, Remove
} = NumberSeries.getAPIHandles()

export const {
    selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus,
    selectData
} = NumberSeries.getSelectors()

export { selectData as selectNumberSeries }