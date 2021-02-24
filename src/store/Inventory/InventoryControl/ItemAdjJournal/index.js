import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel";

const url = "/item-adjustment-journals";
const ItemAdjustmentJournal = new StateArrayModel({
  stateName: "item_adjustment_journals",
});

ItemAdjustmentJournal.createSlice();
ItemAdjustmentJournal.setURL(url);

export const { reducer, stateName } = ItemAdjustmentJournal.getEntity();
export const { getLoading } = ItemAdjustmentJournal;

export const {
  Add,
  Fetch,
  Edit,
  Patch,
  Remove,
} = ItemAdjustmentJournal.getAPIHandles();

// ItemAdjustmentJournal.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectPatchStatus,
  selectData,
} = ItemAdjustmentJournal.getSelectors();

export { selectData as selectItemAdjustmentJournals };

export default reducer;
