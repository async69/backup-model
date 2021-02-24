import entryTypeNames from "constants/entryTypeNames";
import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const EducationType = new StateArrayModel({
  stateName: "education_type",
});

EducationType.setURL(`/entry-types?type=${entryTypeNames.EducationType}`);

EducationType.createSlice();

export const { stateName, reducer } = EducationType.getEntity();
export const { getLoading } = EducationType;

EducationType.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = EducationType.getSelectors();

export const {
  Add,
  Fetch,
  Edit,
  Patch,
  Remove,
} = EducationType.getAPIHandles();

export { selectData as selectEducationTypes };
