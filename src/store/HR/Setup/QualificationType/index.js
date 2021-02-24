import entryTypeNames from "constants/entryTypeNames";
import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const QualificationType = new StateArrayModel({
  stateName: "qualification_type",
});

QualificationType.setURL(
  `/entry-types?type=${entryTypeNames.QualificationType}`
);

QualificationType.createSlice();

export const { stateName, reducer } = QualificationType.getEntity();
export const { getLoading } = QualificationType;

QualificationType.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = QualificationType.getSelectors();

export const {
  Add,
  Fetch,
  Edit,
  Patch,
  Remove,
} = QualificationType.getAPIHandles();

export { selectData as selectQualificationTypes };
