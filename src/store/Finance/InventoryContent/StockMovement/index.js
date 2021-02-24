import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel"

const StockMovement = new StateArrayModel({ stateName: "finance_stock_movements" })

StockMovement.createSlice()
StockMovement.setURL("/finance-stock-movements")

export const {
    reducer,
    stateName
} = StockMovement.getEntity()

export const {
    Add, Fetch, Edit, Remove
} = StockMovement.getAPIHandles()

export const {
    selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus,
    selectData
} = StockMovement.getSelectors()

export { selectData as selectStockMovements }