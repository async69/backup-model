import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel";

const Disposal = new StateArrayModel({
  stateName: "disposals",
});
Disposal.setURL("/disposals");

Disposal.createSlice();

export const { stateName, reducer } = Disposal.getEntity();
export const { getLoading } = Disposal;
// Disposal.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = Disposal.getSelectors();

export const { Add, Fetch, Edit, Patch, Remove } = Disposal.getAPIHandles();

export { selectData as selectDisposals };
