import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const Performance = new StateArrayModel({
  stateName: "performances",
});
Performance.setURL("/performances");

Performance.createSlice();

export const { stateName, reducer } = Performance.getEntity();
export const { getLoading } = Performance;

Performance.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = Performance.getSelectors();

export const { Add, Fetch, Edit, Patch, Remove } = Performance.getAPIHandles();

export { selectData as selectPerformances };
