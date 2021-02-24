import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const ItemMasterData = new StateArrayModel({
  stateName: "warehouse_items",
});

ItemMasterData.setInitialState();
ItemMasterData.createSlice();
ItemMasterData.setURL("/inventory-items");

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectData,
} = ItemMasterData.getSelectors();

export const { stateName, reducer } = ItemMasterData.getEntity();

export { selectData as selectItemMasterDatas };

export const { Add, Edit, Fetch, Remove } = ItemMasterData.getAPIHandles();
