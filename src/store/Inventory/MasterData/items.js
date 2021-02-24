import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const ItemMasterData = new StateArrayModel({
  stateName: "new_item_masterdata",
});

ItemMasterData.setInitialState();
ItemMasterData.createSlice();
ItemMasterData.setURL("/warehouse-items");
// ItemMasterData.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectData,
} = ItemMasterData.getSelectors();

export const { stateName, reducer } = ItemMasterData.getEntity();
export const { getLoading } = ItemMasterData;

export { selectData as selectItemMasterDatas };

export const {
  Add,
  Edit,
  Fetch,
  FetchAll,
  Remove,
} = ItemMasterData.getAPIHandles();
