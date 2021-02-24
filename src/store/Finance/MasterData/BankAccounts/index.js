import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel"

const Bank = new StateArrayModel({ stateName: "bank_accounts" })

Bank.createSlice()
Bank.setURL("/bank-accounts")

export const {
    stateName, reducer
} = Bank.getEntity()

export const {
    selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus,
    selectData
} = Bank.getSelectors()

export { selectData as selectBankAccounts }

export const {
    Add, Fetch, FetchAll, Edit, Remove
} = Bank.getAPIHandles()