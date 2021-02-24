import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel";

const ItemLedgerEntries = new StateArrayModel({
  stateName: "item_ledger_entries",
});
ItemLedgerEntries.setURL("/item-ledger-entries");

ItemLedgerEntries.createSlice();

export const { stateName, reducer } = ItemLedgerEntries.getEntity();

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectData,
} = ItemLedgerEntries.getSelectors();

export const { Add, Fetch, Edit, Remove } = ItemLedgerEntries.getAPIHandles();

export { selectData as selectItemLedgerEntries };
