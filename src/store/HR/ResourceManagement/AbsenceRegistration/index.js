import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const Absence = new StateArrayModel({
  stateName: "absences",
});
Absence.setURL("/absences");

Absence.createSlice();

export const { stateName, reducer } = Absence.getEntity();
export const { getLoading } = Absence;

Absence.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = Absence.getSelectors();

export const { Add, Fetch, Edit, Patch, Remove } = Absence.getAPIHandles();

export { selectData as selectAbsenceRegistrations };
