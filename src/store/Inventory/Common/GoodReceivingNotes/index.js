import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel";

const GoodReceivingNote = new StateArrayModel({
  stateName: "good_receiving_notes",
});
GoodReceivingNote.setURL("/goods-receiving-notes");

GoodReceivingNote.createSlice();

export const { stateName, reducer } = GoodReceivingNote.getEntity();
export const { getLoading } = GoodReceivingNote;

// GoodReceivingNote.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = GoodReceivingNote.getSelectors();

export const {
  Add,
  Fetch,
  Edit,
  Patch,
  Remove,
} = GoodReceivingNote.getAPIHandles();

export { selectData as selectGoodReceivingNotes };
