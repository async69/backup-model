import StateArrayModel from "../../../wrappers/StateModels/StateArrayModel"

const Currency = new StateArrayModel({ stateName: "currencies_new" })

Currency.setInitialState()
Currency.createSlice()
Currency.setURL("/currencies")

export const {
    selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus, selectData
} = Currency.getSelectors()

export const {
    stateName, reducer
} = Currency.getEntity()

export { selectData as selectCurrencies }

export const {
    Add, Edit, Fetch, Remove
} = Currency.getAPIHandles()