import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const InventoryItem = new StateArrayModel({
  stateName: "inventory-items",
});

InventoryItem.setInitialState();
InventoryItem.createSlice();
InventoryItem.setURL("/inventory-items");
// InventoryItem.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectData,
} = InventoryItem.getSelectors();

export const { stateName, reducer } = InventoryItem.getEntity();
export const { getLoading } = InventoryItem;

export { selectData as selectInventoryItems };

export const {
  Add,
  Edit,
  Fetch,
  FetchAll,
  Remove,
} = InventoryItem.getAPIHandles();
