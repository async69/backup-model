import StateArrayModel from "../../../wrappers/StateModels/StateArrayModel";

const url = "/stock-movements-by-locations";
const StockMovement = new StateArrayModel({
  stateName: "updated_stock_movements_by_location",
});

StockMovement.createSlice();
StockMovement.setURL(url);

export const { reducer, stateName } = StockMovement.getEntity();

export const { Add, Fetch, Edit, Remove } = StockMovement.getAPIHandles();

// StockMovement.enableResults({ fetchEnabled: false })

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectData,
} = StockMovement.getSelectors();

export { selectData as selectStocks };

export default reducer;
