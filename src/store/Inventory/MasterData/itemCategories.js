import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const ItemCategories = new StateArrayModel({ stateName: "item_categories" });

ItemCategories.setInitialState();
ItemCategories.createSlice();
ItemCategories.setURL("/item-categories");
// ItemCategories.enableResults({ fetchEnabled: false });
export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectData,
} = ItemCategories.getSelectors();

export const { stateName, reducer } = ItemCategories.getEntity();
export const { getLoading } = ItemCategories;

export { selectData as selectItemCategories };

export const {
  Add,
  Edit,
  Fetch,
  FetchAll,
  Remove,
} = ItemCategories.getAPIHandles();
