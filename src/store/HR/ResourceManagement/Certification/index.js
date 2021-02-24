import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const Certification = new StateArrayModel({
  stateName: "certifications",
});
Certification.setURL("/certifications");

Certification.createSlice();

export const { stateName, reducer } = Certification.getEntity();
export const { getLoading } = Certification;

Certification.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = Certification.getSelectors();

export const {
  Add,
  Fetch,
  Edit,
  Patch,
  Remove,
} = Certification.getAPIHandles();

export { selectData as selectCertifications };
