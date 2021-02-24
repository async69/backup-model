import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const Qualification = new StateArrayModel({
  stateName: "qualifications",
});
Qualification.setURL("/qualifications");

Qualification.createSlice();

export const { stateName, reducer } = Qualification.getEntity();
export const { getLoading } = Qualification;

Qualification.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = Qualification.getSelectors();

export const {
  Add,
  Fetch,
  Edit,
  Patch,
  Remove,
} = Qualification.getAPIHandles();

export { selectData as selectQualifications };
