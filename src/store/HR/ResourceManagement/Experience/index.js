import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const Experience = new StateArrayModel({
  stateName: "experiences",
});
Experience.setURL("/experiances");

Experience.createSlice();

export const { stateName, reducer } = Experience.getEntity();
export const { getLoading } = Experience;

Experience.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = Experience.getSelectors();

export const { Add, Fetch, Edit, Patch, Remove } = Experience.getAPIHandles();

export { selectData as selectExperiences };
