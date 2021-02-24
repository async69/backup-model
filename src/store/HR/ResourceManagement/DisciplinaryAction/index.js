import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const DisciplinaryAction = new StateArrayModel({
  stateName: "disciplinary_actions",
});
DisciplinaryAction.setURL("/disciplinary-actions");

DisciplinaryAction.createSlice();

export const { stateName, reducer } = DisciplinaryAction.getEntity();
export const { getLoading } = DisciplinaryAction;

DisciplinaryAction.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = DisciplinaryAction.getSelectors();

export const {
  Add,
  Fetch,
  Edit,
  Patch,
  Remove,
} = DisciplinaryAction.getAPIHandles();

export { selectData as selectDisciplinaryActions };
