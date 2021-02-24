import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const Termination = new StateArrayModel({
  stateName: "termination",
});
Termination.setURL("/terminations");

Termination.createSlice();

export const { stateName, reducer } = Termination.getEntity();
export const { getLoading } = Termination;

Termination.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = Termination.getSelectors();

export const { Add, Fetch, Edit, Patch, Remove } = Termination.getAPIHandles();

export { selectData as selectTerminations };
