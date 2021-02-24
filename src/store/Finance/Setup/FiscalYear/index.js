import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel"

const FiscalYear = new StateArrayModel({ stateName: "new_fiscal_years" })

FiscalYear.createSlice()
FiscalYear.setURL("/fiscal-years")

export const {
    reducer,
    stateName
} = FiscalYear.getEntity()

export const {
    Add, Fetch, Edit, Remove
} = FiscalYear.getAPIHandles()

export const { getLoading } = FiscalYear

export const {
    selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus,
    selectData
} = FiscalYear.getSelectors()

export { selectData as selectFiscalYears }

export default reducer