import entryTypeNames from "constants/entryTypeNames";
import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const Institution = new StateArrayModel({
  stateName: "institution",
});

Institution.setURL(`/entry-types?type=${entryTypeNames.Institution}`);

Institution.createSlice();

export const { stateName, reducer } = Institution.getEntity();
export const { getLoading } = Institution;

Institution.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = Institution.getSelectors();

export const { Add, Fetch, Edit, Patch, Remove } = Institution.getAPIHandles();

export { selectData as selectInstitutions };
