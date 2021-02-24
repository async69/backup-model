import entryTypeNames from "constants/entryTypeNames";
import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const DisciplinaryActionType = new StateArrayModel({
  stateName: "disciplinary_action_type",
});

DisciplinaryActionType.setURL(
  `/entry-types?type=${entryTypeNames.DisciplinaryActionType}`
);

DisciplinaryActionType.createSlice();

export const { stateName, reducer } = DisciplinaryActionType.getEntity();
export const { getLoading } = DisciplinaryActionType;

DisciplinaryActionType.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = DisciplinaryActionType.getSelectors();

export const {
  Add,
  Fetch,
  Edit,
  Patch,
  Remove,
} = DisciplinaryActionType.getAPIHandles();

export { selectData as selectDisciplinaryActionTypes };
