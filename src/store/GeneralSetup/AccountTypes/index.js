import StateArrayModel from "../../../wrappers/StateModels/StateArrayModel"

const url = "/account-types"
const AccountType = new StateArrayModel({ stateName: "account_types" })

AccountType.createSlice()
AccountType.setURL(url)

export const {
    reducer,
    stateName
} = AccountType.getEntity()

export const {
    Add, Fetch, Edit, Remove
} = AccountType.getAPIHandles()

export const {
    selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus,
    selectData
} = AccountType.getSelectors()

export { selectData as selectAccountTypes }