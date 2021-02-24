import entryTypeNames from "constants/entryTypeNames";
import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const TrainingType = new StateArrayModel({
  stateName: "training_type",
});

TrainingType.setURL(`/entry-types?type=${entryTypeNames.TrainingType}`);

TrainingType.createSlice();

export const { stateName, reducer } = TrainingType.getEntity();
export const { getLoading } = TrainingType;

TrainingType.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = TrainingType.getSelectors();

export const { Add, Fetch, Edit, Patch, Remove } = TrainingType.getAPIHandles();

export { selectData as selectTrainingTypes };
