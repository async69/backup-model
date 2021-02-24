import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const Training = new StateArrayModel({
  stateName: "trainings",
});
Training.setURL("/trainings");

Training.createSlice();

export const { stateName, reducer } = Training.getEntity();
export const { getLoading } = Training;

Training.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = Training.getSelectors();

export const { Add, Fetch, Edit, Patch, Remove } = Training.getAPIHandles();

export { selectData as selectTrainings };
