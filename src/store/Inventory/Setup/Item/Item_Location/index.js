import StateArrayModel from "../../../../../wrappers/StateModels/StateArrayModel";

const ItemLocation = new StateArrayModel({ stateName: "item_location" });

ItemLocation.setInitialState();
ItemLocation.createSlice();
ItemLocation.setURL("/warehouses");

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectData,
} = ItemLocation.getSelectors();

export const { stateName, reducer } = ItemLocation.getEntity();

export { selectData as selectItemLocations };

export const {
  Add,
  Edit,
  Fetch,
  FetchAll,
  Remove,
} = ItemLocation.getAPIHandles();
