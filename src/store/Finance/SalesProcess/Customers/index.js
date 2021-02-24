import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel"

const url = "/customers"
const Customer = new StateArrayModel({ stateName: "customers" })

Customer.createSlice()
Customer.setURL(url)

export const {
    reducer,
    stateName
} = Customer.getEntity()

export const {
    Add, Fetch, Edit, Remove
} = Customer.getAPIHandles()

export const {
    selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus,
    selectData
} = Customer.getSelectors()

export { selectData as selectCustomers }

export default reducer