import StateArrayModel from "../../../wrappers/StateModels/StateArrayModel";

const url = "/warehouses";
const Warehouse = new StateArrayModel({
  stateName: "warehouses",
});

Warehouse.createSlice();
Warehouse.setURL(url);

export const { reducer, stateName } = Warehouse.getEntity();

export const { Add, Fetch, FetchAll, Edit, Remove } = Warehouse.getAPIHandles();
export const { getLoading } = Warehouse;

// Warehouse.enableResults({ fetchEnabled: false })

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectData,
} = Warehouse.getSelectors();

export { selectData as selectWarehouses };

export default reducer;
